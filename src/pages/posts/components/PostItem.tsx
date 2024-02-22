import { useState } from "react";
import styled from "styled-components";

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

interface PostItemProps {
  post: Post;
  key: string;
  onClick: () => void;
  deletePost: () => void;
  onEdit: (updatedData: Partial<Post>) => Promise<void>;
}

const PostWrapper = styled.div`
  background: linear-gradient(120deg, #ffdefa 0%, #ffffff50 100%) padding-box,
    linear-gradient(to right, #a3257f88, darkorchid) border-box;
  border: 1px solid transparent;

  backdrop-filter: blur(15px);

  border-radius: 9px;
  padding: 15px;

  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 70px;
  padding: 0 15px;
`;

const DeletePost = styled.button`
  padding: 10px 30px;
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  border-radius: 50px;
  font-size: 1.4rem;
  text-transform: uppercase;
  background-color: #e02a60;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #d63131;
  }
`;

const EditPostBtn = styled.button`
  padding: 10px 30px;
  position: absolute;
  bottom: 70px;
  right: 15px;
  border: none;
  border-radius: 50px;
  font-size: 1.4rem;
  text-transform: uppercase;
  background-color: #215851;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #31b5d6;
  }
`;

const MoreInfoBtn = styled.button`
  padding: 15px 30px;
  position: absolute;
  bottom: 15px;
  right: 15px;
  border: none;
  border-radius: 50px;
  font-size: 1.4rem;
  text-transform: uppercase;
  background-color: #53cf67;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #6dd400;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 99999;
`;

const EditForm = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 700px;
  margin: 130px auto;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 25px;
  border: 1px solid #ccc;
  border-radius: 9px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 2.4rem;
  font-weight: 700;
  margin-right: 15px;
  color: #a3257f;
`;

const CloseEditModal = styled.p`
  font-size: 3rem;
  color: #a3257f;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 10px;
  font-weight: 700;
`;

const PostItem: React.FC<PostItemProps> = ({
  post,
  onClick,
  deletePost,
  onEdit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData: Partial<Post> = {
      title: title,
      body: body,
    };
    await onEdit(updatedData);
    setShowModal(false);
  };

  return (
    <li>
      <PostWrapper>
        <Title>Post title: {post.title}</Title>
        <Content>
          Post content: <br /> {post.body}
        </Content>
        <p>Post user: {post.userId}</p>
        <MoreInfoBtn onClick={onClick}>More Information</MoreInfoBtn>
        <EditPostBtn onClick={() => setShowModal(true)}>Edit Post</EditPostBtn>
        <DeletePost onClick={deletePost}>Delete Post</DeletePost>
      </PostWrapper>
      <Modal style={{ display: showModal ? "block" : "none" }}>
        <EditForm onSubmit={handleSubmit}>
          <CloseEditModal onClick={() => setShowModal(!showModal)}>
            X
          </CloseEditModal>
          <Label htmlFor="userDropdown">New Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="userDropdown">New Post Content:</Label>
          <Input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <SubmitButton type="submit">Save Changes</SubmitButton>
        </EditForm>
      </Modal>
    </li>
  );
};

export default PostItem;
