import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PostItem from "./PostItem";
import PostModal from "./PostModal";

const PostsListWrapper = styled.ul`
  padding: 10px 20px;
`;

const Label = styled.label`
  font-size: 2.4rem;
  font-weight: 700;
  margin-right: 15px;
`;

const Select = styled.select`
  font-size: 2rem;
  background-color: inherit;
  padding: 10px;
  border-radius: 50px;
  border-color: #333;
  margin-bottom: 20px;
`;

const Option = styled.option`
  color: #333;
  background-color: #a3257f88;
`;

const CreateNewPostBtn = styled.button`
  display: block;
  padding: 15px 40px;
  border-radius: 50px;
  border: none;
  margin-bottom: 20px;
  color: #a3257f;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;

const CreatePostBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 10px auto 0 auto;
  padding: 15px 40px;
  border-radius: 50px;
  border: none;
  color: #333;
  background-color: #7fd127;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;

const CreatePostWrapper = styled.div`
  background: linear-gradient(
    120deg,
    var(--luka-color-2) 0%,
    var(--luka-color-1) 100%
  );
  display: flex;
  flex-direction: column;
  width: 600px;
  border-radius: 13px;
  padding: 20px;
  margin-bottom: 5px;
`;

const TextArea = styled.textarea`
  resize: none;
  height: 120px;
  border-radius: 9px;
  border: none;
  margin: 5px 0 15px 0;
  padding: 5px 15px;
  font-size: 1.6rem;
`;

const PostInput = styled.input`
  border-radius: 9px;
  border: none;
  margin: 5px 0 15px 0;
  height: 60px;
  padding: 5px 15px;
  font-size: 1.6rem;
`;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function AllPosts() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setAllPosts(response.data);
      } catch (error) {
        alert("Error loading posts from server");
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedUserId === "") {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts.filter(
        (post) => post.userId === parseInt(selectedUserId)
      );
      setFilteredPosts(filtered);
    }
  }, [selectedUserId, allPosts]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreatePost = async () => {
    try {
      const response = await axios.post<Post>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: parseInt(selectedUserId),
          title: newPostTitle,
          body: newPostBody,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setAllPosts((prevPosts) => [response.data, ...prevPosts]);
      setNewPostTitle("");
      setNewPostBody("");
      setShowCreatePostModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const updatedPosts = allPosts.filter((post) => post.id !== postId);
      setAllPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = async (postId: number, updatedData: Partial<Post>) => {
    try {
      const response = await axios.patch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        updatedData,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setAllPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? response.data : post))
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div>
      <Label htmlFor="userDropdown">Select User:</Label>
      <Select
        id="userDropdown"
        value={selectedUserId}
        onChange={handleUserChange}
      >
        <Option value="">All Users</Option>
        {[...new Set(allPosts.map((user) => user.userId))].map((userId) => (
          <Option key={userId} value={userId}>
            {userId}
          </Option>
        ))}
      </Select>
      <CreateNewPostBtn
        onClick={() => setShowCreatePostModal(!showCreatePostModal)}
      >
        Create New Post
      </CreateNewPostBtn>

      {showCreatePostModal && (
        <CreatePostWrapper>
          <h2>Create a New Post</h2>
          <Label htmlFor="newPostTitle">Title:</Label>
          <PostInput
            type="text"
            id="newPostTitle"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <Label htmlFor="newPostBody">Content:</Label>
          <TextArea
            id="newPostBody"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
          ></TextArea>
          <CreatePostBtn onClick={handleCreatePost}>Create</CreatePostBtn>
        </CreatePostWrapper>
      )}

      <PostsListWrapper>
        {filteredPosts.map((post) => (
          <PostItem
            post={post}
            key={`${post.id}`}
            onClick={() => handlePostClick(post)}
            deletePost={() => handleDeletePost(post.id)}
            onEdit={(updatedData) => handleEditPost(post.id, updatedData)}
          />
        ))}
      </PostsListWrapper>

      {showModal && selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default AllPosts;
