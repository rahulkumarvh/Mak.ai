import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import Clear from "@material-ui/icons/Clear";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    fontFamily: "Trebuchet MS",
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "black",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 520,
    backgroundColor: "white",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardEmpty: {
    height: "auto",
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: "none",
  },
  uploadIcon: {
    background: "white",
  },
  tableContainer: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  table: {
    backgroundColor: "transparent !important",
  },
  tableHead: {
    backgroundColor: "transparent !important",
  },
  tableRow: {
    backgroundColor: "transparent !important",
  },
  tableCell: {
    fontSize: "20px",
    fontFamily: "Trebuchet MS",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "green !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableCell1: {
    fontSize: "18px",
    fontFamily: "Trebuchet MS",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "black !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableBody: {
    backgroundColor: "transparent !important",
  },
  text: {
    color: "white !important",
    textAlign: "center",
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  appbar: {
    background: "#be6a77",
    boxShadow: "none",
    color: "white",
  },
  loader: {
    color: "#be6a77 !important",
  },
  DropzoneArea: {
    fontWeight: 10,
    margin: 0,
    padding: 5,
  },
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <div className="relative z-10 h-1/2 bg-green-400">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div class="container px-6 pt-24 mx-auto text-center">
          <div class="max-w-lg mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
              Drag and drop the image of the crop leaf
            </h1>
          </div>
        </div>
        <div className="pt-10 z-20">
          <Container
            maxWidth={false}
            className={classes.mainContainer}
            disableGutters={true}
          >
            <Grid
              className={classes.gridContainer}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Card
                  className={`${classes.imageCard} ${
                    !image ? classes.imageCardEmpty : ""
                  }`}
                >
                  {image && (
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={preview}
                        component="image"
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                  )}
                  {!image && (
                    <div className="p-8 text-black bg-white shadow-xl rounded-3xl font-normal">
                      <DropzoneArea
                        acceptedFiles={["image/*"]}
                        dropzoneClass={classes.DropzoneArea}
                        dropzoneText={"Drag and drop"}
                        onChange={onSelectFile}
                      />
                    </div>
                  )}
                  {data && (
                    <CardContent className={classes.detail}>
                      <TableContainer
                        component={Paper}
                        className={classes.tableContainer}
                      >
                        <Table
                          className={classes.table}
                          size="small"
                          aria-label="simple table"
                        >
                          <TableHead className={classes.tableHead}>
                            <TableRow className={classes.tableRow}>
                              <TableCell className={classes.tableCell1}>
                                Label:
                              </TableCell>
                              <TableCell
                                align="right"
                                className={classes.tableCell1}
                              >
                                <div className="pb-1">Confidence:</div>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody className={classes.tableBody}>
                            <TableRow className={classes.tableRow}>
                              <TableCell
                                component="th"
                                scope="row"
                                className={classes.tableCell}
                              >
                                {data.class}
                              </TableCell>
                              <TableCell
                                align="right"
                                className={classes.tableCell}
                              >
                                <div className="inline-flex items-center justify-center space-x-2 py-3 px-4 border border-transparent text-sm font-medium rounded-md text-green-600 hover:text-green-700 bg-green-100 hover:bg-green-300 transition-colors">
                                  {confidence}%
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  )}
                  {isLoading && (
                    <CardContent className={classes.detail}>
                      <CircularProgress
                        color="secondary"
                        className={classes.loader}
                      />
                      <Typography className={classes.title} variant="h6" noWrap>
                        Processing
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Grid>
              {data && (
                <Grid item className={classes.buttonGrid}>
                  <ColorButton
                    variant="contained"
                    className={classes.clearButton}
                    color="primary"
                    component="span"
                    size="large"
                    onClick={clearData}
                    startIcon={<Clear fontSize="large" />}
                  >
                    Clear
                  </ColorButton>
                </Grid>
              )}
            </Grid>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};
