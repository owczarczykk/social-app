import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import User from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "store";

const Post = ({ imgPath }) => {
  const [isImage, setIsImage] = useState(false);
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const fullName = `${user.name} ${user.lastName}`;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("description", post);
    formData.append("userId", user._id);
    if (image) {
      formData.append("picture", image);
      formData.append("imgPath", image.name);
    }

    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };
  return (
    <WidgetWrapper>
      <FlexBetween gap="1rem">
        <User imgPath={user.imgPath} />
        <InputBase
          placeholder="What are you thinking about?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box
          width="100%"
          padding="1rem 1rem"
          margin="1rem 0"
          sx={{
            borderRadius: "1rem",
            border: `0.1rem solid ${theme.palette.neutral.light}`,
          }}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  width="100%"
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "2rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
          <Typography
            color={theme.palette.neutral.mediumMain}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.neutral.medium,
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined
                sx={{ color: theme.palette.neutral.mediumMain }}
              />
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                File
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined
                sx={{ color: theme.palette.neutral.mediumMain }}
              />
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined
              sx={{ color: theme.palette.neutral.mediumMain }}
            />
          </FlexBetween>
        )}
        {image && (
          <Button
            onClick={handlePost}
            sx={{
              color: theme.palette.background.alt,
              backgroundColor: theme.palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            Post
          </Button>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default Post;
