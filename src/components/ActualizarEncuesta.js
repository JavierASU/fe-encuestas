import React from "react";

import {
  CardContent,
  Container,
  Typography,
  Card,
  Box,
  Modal,
  Button,
  CardHeader,
  TextField,
  CardActions,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { red, green } from "@mui/material/colors";
import { width } from "@mui/system";
import { blue, indigo, deepPurple, grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function NuevaEncuesta() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,

    border: "0px solid #000",
    boxShadow: 50,
    p: 4,
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 50,
    p: 4,
  };
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <UpgradeIcon sx={{ color: green[500] }}></UpgradeIcon>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style1}>
          <Card>
            <Paper>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={4}>
                  <Typography
                    variant="h4"
                    component="div"
                    marginLeft={8}
                    justify="center"
                    alignItems="center"
                    direction="column"
                    fullWidth
                  >
                    Confirmacion de Datos
                  </Typography>
                  <CardContent>
                    <Typography>Nombre</Typography>
                    <TextField
                      fullWidth
                      sx={{
                        display: "-ms-inline-flexbox",
                        margin: ".5rem 5",
                        width: 449,
                      }}
                    ></TextField>
                    <br />
                    <br />
                    <Typography>Apellido</Typography>
                    <TextField
                      fullWidth
                      sx={{
                        display: "-ms-inline-flexbox",
                        margin: ".5rem 5",
                        width: 449,
                      }}
                    ></TextField>
                    <br />
                    <br />
                    <Typography>Cedula</Typography>
                    <TextField
                      fullWidth
                      sx={{
                        display: "-ms-inline-flexbox",
                        margin: ".5rem 5",
                        width: 449,
                      }}
                    ></TextField>
                    <br />
                    <br />
                    <Typography>Telefono</Typography>
                    <TextField
                      fullWidth
                      sx={{
                        display: "-ms-inline-flexbox",
                        margin: ".5rem 5",
                        width: 449,
                      }}
                    ></TextField>
                    <br />
                    <br />
                    <Typography>Obsevacion</Typography>

                    <TextField
                      fullWidth
                      id="outlined-textarea"
                      label="Multiline Placeholder"
                      multiline
                      sx={{
                        display: "-ms-inline-flexbox",
                        margin: ".5rem 5",
                        width: 449,
                      }}
                    ></TextField>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={1} sx={{ marginLeft: 29 }}>
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Cancelar
                      </Button>
                      <Button variant="contained" endIcon={<SendIcon />}>
                        Cargar
                      </Button>
                    </Stack>
                  </CardActions>
                </Grid>
              </Grid>
            </Paper>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
