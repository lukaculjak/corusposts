import Logo from "../../ui/Logo";
import styled from "styled-components";

import AllPosts from "./components/AllPosts";

const PostsPage = styled.div`
  height: 100%;
  width: 1200px;
  margin: 0 auto;
`;

function Posts() {
  return (
    <PostsPage>
      <Logo />
      <AllPosts />
    </PostsPage>
  );
}

export default Posts;
