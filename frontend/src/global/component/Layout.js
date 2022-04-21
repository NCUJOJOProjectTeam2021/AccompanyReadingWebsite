import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ForumIcon from '@mui/icons-material/Forum';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";

const drawerWidth = 30

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        root: {
            display: 'flex',
        },
        drawer: {
            width: '14%',
        },
        drawerPaper: {
            width: '14%',
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2),
        },
    }
})

export default function Layout() {
    const classes = useStyles()
    const navigate = useNavigate()

    const menuItems = [
        {
            text: 'Forum',
            icon: <ForumIcon color="secondary" />,
            path: '/forum'
        },
        {
            text: 'Create post',
            icon: <CreateIcon color="secondary" />,
            path: '/create-post'
        },
    ];

    return (
        <div className={classes.root}>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <div>
                    <Typography variant="h4" className={classes.title}>
                        LearnFun
                    </Typography>
                </div>

                {/* links/list section */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>

            </Drawer>

            {/* main content */}
        </div>
    )
}