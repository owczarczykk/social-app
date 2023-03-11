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
import { PropTypes } from "prop-types";
import FlexBetween from "components/UI/FlexBetween";
import Dropzone from "react-dropzone";
import User from "components/UserImage/UserImage";
import WidgetWrapper from "components/UI/WidgetWrapper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "store";
import styles from "./styles";

const AddPost = ({ imgPath, user, token }) => {
  const [isImage, setIsImage] = useState(false);
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const { classes } = styles(theme);
  const dispatch = useDispatch();
  const placeHolder = `What are you thinking about, ${user.name}?`;
  const baseUrl = "http://localhost:3001/";

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("description", post);
    formData.append("userId", user._id);
    if (image) {
      formData.append("picture", image);
      formData.append("imgPath", image.name);
    }
    const formDataObject = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(formDataObject);
    const response = await fetch(baseUrl + "post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: formDataJson,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setIsImage(false);
    setImage(null);
    setPost("");
  };
  return (
    <WidgetWrapper margin="0 0 1rem 0">
      <FlexBetween sx={classes.inputBase}>
        <User imgPath={user.imgPath} />
        <InputBase
          placeholder={placeHolder}
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={classes.inputBase_inputBase}
        />
      </FlexBetween>

      {isImage && (
        <Box sx={classes.image}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box {...getRootProps()} sx={classes.image__box}>
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
                    sx={classes.image__icon}
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
          <ImageOutlined sx={classes.icons} />
          <Typography
            color={theme.palette.neutral.mediumMain}
            sx={classes.icons_typography}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={classes.icons} />
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={classes.icons_typography}
              >
                File
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={classes.icons} />
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={classes.icons_typography}
              >
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={classes.icons} />
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={classes.icons_typography}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={classes.icons} />
          </FlexBetween>
        )}
        {image && (
          <Button onClick={handlePost} sx={classes.button}>
            Post
          </Button>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};
AddPost.propTypes = {
  imgPath: PropTypes.string,
  user: PropTypes.object,
  token: PropTypes.string,
};
export default AddPost;
