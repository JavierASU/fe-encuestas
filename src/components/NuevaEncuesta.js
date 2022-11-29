import { useState } from "react";

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
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Icon,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { red, green, teal, blue } from "@mui/material/colors";

import FiberNewIcon from "@mui/icons-material/FiberNew";

export default function NuevaEncuesta() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <FiberNewIcon
          fontSize="medium"
          sx={{ color: blue[700], marginTop: 0 }}
        ></FiberNewIcon>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                    marginLeft={20}
                    justify="center"
                    alignItems="center"
                    direction="column"
                    fullWidth
                  >
                    Encuesta
                  </Typography>
                  <CardContent>
                    <Typography>
                      ¿Como calificaria su experiencia en el proceso de
                      instación?{" "}
                    </Typography>
                    <Radio sx={{ marginLeft: 19 }}>Malo</Radio>
                    <Radio>Buena</Radio>
                    <Radio>Muy Buena</Radio>
                    <Box sx={{ width: 449 }}>
                      <FormControl fullWidth>
                        <Typography>Valoracion</Typography>
                        <Select value={age} onChange={handleChange}>
                          <MenuItem value={10}>Bueno</MenuItem>
                          <MenuItem value={20}>Muy Bueno</MenuItem>
                          <MenuItem value={30}>Regular</MenuItem>
                          <MenuItem value={40}>Malo</MenuItem>
                          <MenuItem value={50}>Muy Malo</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
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
                    <Typography>
                      ¿Como fue el trato y las acciones de los instaladores?
                    </Typography>
                    <Radio sx={{ marginLeft: 19 }}>Malo</Radio>
                    <Radio>Buena</Radio>
                    <Radio>Muy Buena</Radio>
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
                    <Typography>
                      ¿como fue el trato del personal de ventas?
                    </Typography>
                    <Radio sx={{ marginLeft: 19 }}>Malo</Radio>
                    <Radio>Buena</Radio>
                    <Radio>Muy Buena</Radio>
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
                    <Typography>
                      ¿Que le parece hasta ahora el servicio?
                    </Typography>
                    <Radio sx={{ marginLeft: 19 }}>Malo</Radio>
                    <Radio>Buena</Radio>
                    <Radio>Muy Buena</Radio>
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
                    <Typography>Si pudieras, ¿qué mejorarías?</Typography>
                    <Radio sx={{ marginLeft: 19 }}>Malo</Radio>
                    <Radio>Buena</Radio>
                    <Radio>Muy Buena</Radio>
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
                    {/* <Typography>Obsevacion</Typography>

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
                    ></TextField> */}
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
