import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ModalContent = styled.div`
  background: linear-gradient(120deg, #fff 0%, var(--luka-color-2) 100%);
  color: #000;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  overflow-y: auto;
  max-height: calc(100% - 40px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  padding: 20px 50px;
  font-weight: 500;
  font-size: 2rem;
  border-radius: 11px;
  border: none;
  background-color: var(--luka-color-1);
  cursor: pointer;
  filter: drop-shadow(0px 7px 20px #8080d9);
  color: #fff;
`;

const ModalBodyText = styled.p`
  padding: 0 15px;
  margin-bottom: 20px;
`;

const CommentList = styled.ul`
  margin-top: 20px;
  padding: 0;
  list-style: none;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 10px 15px;
  font-size: 1.8rem;
`;

const CommentContent = styled.p`
  padding: 0 15px;
  font-size: 1.4rem;
`;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostModalProps {
  post: Post;
  onClose: () => void;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const preventScroll = (event: WheelEvent | TouchEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent>
        <h2>Post Title: {post.title}</h2>
        <ModalBodyText>Post Content: {post.body}</ModalBodyText>
        <CloseButton onClick={onClose}>Close Window</CloseButton>
        <CommentList>
          <h3>Comment Section:</h3>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <strong>{comment.name}</strong> - {comment.email}
              <CommentContent>{comment.body}</CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PostModal;
