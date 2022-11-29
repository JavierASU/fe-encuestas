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
import NextPlanIcon from "@mui/icons-material/NextPlan";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { red, green, teal, orange } from "@mui/material/colors";

export default function DesviarEncuesta() {
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
        <NextPlanIcon sx={{ color: orange[700], marginTop: 0 }}></NextPlanIcon>
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
                    variant="h5"
                    component="div"
                    marginLeft={10}
                    justify="center"
                    alignItems="center"
                    direction="column"
                    fullWidth
                  >
                    Por que Desviar la Encuesta
                  </Typography>
                  <CardContent>
                    <Box sx={{ width: 449 }}>
                      <FormControl fullWidth>
                        <Typography>Selecione una Opcion</Typography>
                        <Select value={age} onChange={handleChange}>
                          <MenuItem value={10}>No Contesto</MenuItem>
                          <MenuItem value={20}>No Conecto</MenuItem>
                          <MenuItem value={30}>
                            Se Vencio el Tiempo de Espera
                          </MenuItem>
                          <MenuItem value={40}>El Cliente Cuelga</MenuItem>
                          <MenuItem value={50}>Otros</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
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
