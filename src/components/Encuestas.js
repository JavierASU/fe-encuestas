import * as React from "react";

import NuevaEncuesta from "../components/NuevaEncuesta";
import ActualizarEncuesta from "../components/ActualizarEncuesta";
import DesviarEncuesta from "./DesviarEncuesta";
import Navbar from "./Navbar";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  FormControl,
  TextField,
  Button,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DeleteIcon from "@mui/icons-material/Delete";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import IconButton from "@mui/material/IconButton";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { http } from "../auth";

import { red, green, teal, orange, deepPurple } from "@mui/material/colors";
import Alert from "@mui/material/Alert";

import { useState } from "react";
export default function Encuestas() {
  const [encuesta, setEncuesta] = useState([]);

  const [buscar, setBuscar] = useState("");
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const loadEncuestas = async () => {
    const env = process.env.REACT_APP_ENV;
    const host =
      env === "PROD"
        ? process.env.REACT_APP_BFF_HOST
        : "https://intranet.fibra360.net/api/encuestas";
    const res = await http.get(`${host}`);

    setEncuesta(res.data);
  };

  const deleteEncuesta = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    window.location.href = "/";
  };

  const handleChange = (e) => {
    setBuscar(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div>
        <Container>
          <Paper elevation={24}>
            <TableContainer component={Paper} sx={{ mt: 15, mb: 10 }}>
              <FormControl>
                <TextField
                  sx={{ mt: 2, width: 200, marginLeft: 111 }}
                ></TextField>
                <IconButton
                  sx={{ mt: 2, ml: 130, mt: -5 }}
                  onClick={() => loadEncuestas()}
                >
                  <SearchIcon fontSize="medium"></SearchIcon>
                </IconButton>
              </FormControl>
              <Table
                sx={{ minWidth: 500 }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Telefonos</TableCell>
                    <TableCell align="">Nombre</TableCell>
                    <TableCell align="">
                      <Typography>Apellido</Typography>
                    </TableCell>
                    <TableCell align="">
                      <Typography>Cedula</Typography>
                    </TableCell>
                    <TableCell align="">
                      <Typography marginLeft={5}>Acciones</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {encuesta.map((row) => (
                    <TableRow key={row}>
                      <TableCell>{row.telefono}</TableCell>
                      <TableCell>{row.primer_nombre}</TableCell>
                      <TableCell>{row.apellido}</TableCell>
                      <TableCell>{row.cedula}</TableCell>
                      <TableCell>
                        <ButtonGroup
                          variant=""
                          aria-label="outlined button group"
                          size="small"
                          elevation
                        >
                          <NuevaEncuesta />
                          <ActualizarEncuesta />

                          <IconButton>
                            <CallIcon
                              fontSize="medium"
                              sx={{ color: teal[700], marginTop: 0 }}
                            ></CallIcon>
                          </IconButton>
                          <IconButton>
                            <CallEndIcon
                              fontSize="medium"
                              sx={{ color: red[700], marginTop: 0 }}
                            ></CallEndIcon>
                          </IconButton>
                          <DesviarEncuesta />
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </div>
    </>
  );
}
