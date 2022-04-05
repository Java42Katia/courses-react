import React, { ReactNode, useEffect, useState } from "react";
import { Box, Button, IconButton, Link, TextField } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import LoginData from "../../models/common/LoginData";
import { Alert } from "@material-ui/lab";
import NetworkIcon from "../../models/common/NetworkIcon";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://tel-ran.co.il/">
                Tel-Ran ltd
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        // backgroundColor: 'green',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    iconButton: {


        [theme.breakpoints.down("xs")]: {
            width: "6vh"
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: "6vw"
        },
        "@media (min-width: 1000px)": {
            width: "3vw"
        }
        //width: "3vw"

    },
    iconsContainer: {
        display: 'flex'

    }
}));
type Props = {
    onSubmit: (loginData: LoginData) => Promise<boolean>;
    networks?: NetworkIcon[]


}
const emptyLoginData: LoginData = { email: '', password: '' };
const LoginForm: React.FC<Props> = (props) => {
    const { onSubmit, networks } = props;
    const [loginData, setLoginData] = useState<LoginData>(emptyLoginData)
    const [isValid, setIsValid] = useState<boolean>(false)
    const [flAlert, setAlert] = useState<boolean>(false);
    const classes = useStyles();
    async function onSubmitForm(event: any) {
        event.preventDefault();
        const res = await onSubmit(loginData);
        setLoginData(emptyLoginData);

        if (!res) {
            setAlert(true)
        } else {
            const formElement = (document.querySelector('form') as any);
            formElement && formElement.reset();
        }

    }
    function getNetworkIcons(): ReactNode {
        if (networks) {
            return networks.map(nw => <IconButton key={nw.name} onClick={() =>
                onSubmit({ email: nw.name, password: '' })} >

                <img src={nw.iconUrl} className={classes.iconButton} alt={nw.name} />
            </IconButton>)
        }
    }
    function handlerChange(event: any) {
        setAlert(false);
        (loginData as any)[event.target.name] = event.target.value as string;
        setLoginData({ ...loginData });
    }

    useEffect(() => {
        function validate(): boolean {
            return !!loginData.email && !!loginData.password;
        }

        setIsValid(validate());
    }, [loginData])
    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        {flAlert && <Alert onClose={() => setAlert(false)} severity={'error'}>Wrong Credentials!</Alert>}
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form onSubmit={onSubmitForm} className={classes.form}>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoFocus

                    onChange={handlerChange}
                />
                <TextField label={'Password'} name={'password'} variant="outlined"
                    margin="normal"
                    type={'password'}
                    required
                    fullWidth

                    onChange={handlerChange}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!isValid}
                >
                    Sign In
                </Button>
                <Button type={'reset'} variant="contained"
                    color="primary">Reset</Button>

            </form>
            <div className={classes.iconsContainer}>
                {getNetworkIcons()}
            </div>

        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
    </Container>
}
export default LoginForm;
