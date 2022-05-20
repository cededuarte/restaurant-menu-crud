// Objectives:
// Category
//Name
// Price/Cost
//Amount in stock or Quantity
//Options of Serving size

import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {RiseLoader} from 'react-spinners'
import {ToastContainer, toast} from 'react-toastify';
import {getMenuItems, addMenu, getMenuItem, updateMenu, deleteMenu} from '../data/menuData';
import MenuDialog from './MenuDialog';
// import firebase from '../helpers/db';

const Menu = props => {
    const classes  = useStyles();
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [menuId, setMenuId] = useState('');
    const [category, setCategory] = useState('');
    const [menuname, setMenuName] = useState('');
    const [price, setPrice] =  useState('');
    const [quantity, setQuantity] = useState('');
    const [servingsize, setServingSize] = useState('Not Applicable');
    const [status, setStatus] = useState('Available');
    const override =`
        display: flex;
        margin: 20px;
        align-items: center;
        justify-content: center;    
        border-color: blue;
    `;



    const handleClose = () => {
        setOpen(false);
    }
    const handleCategory = (event) => {
        setCategory(event.target.value);
    }
    const handleMenuName = (event) => {
        setMenuName(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    }  
    const handleServingSize = (event) => {
        setServingSize(event.target.value);
    }    
    const handleStatus = (event) => {
        setStatus(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getMenuItems();
            setMenus(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneMenu = async (id) => {
            try {
                setFormMode(false);
                setMenuId(id);
                const response = await getMenuItem(id);
                 setCategory(response.category);
                 setMenuName(response.menuname);
                 setPrice(response.price);
                 setQuantity(response.quantity);
                 setServingSize(response.servingsize);
                 setStatus(response.status);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteMenu(id);
                getlist();
                toast.success('Menu Deleted Successfully');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setCategory('');
            setMenuName('');
            setPrice('');
            setQuantity('');
            setServingSize('Not Applicable'); 
            setStatus('Available');
            
    }

    const addMenuHandler = async () => {
            try {
                 const menu = {
                     category,
                     menuname,
                     price,
                     quantity,
                     status,
                     servingsize,
                 }
                if (formMode) {
                    await addMenu(menu);
                    toast.success('New Menu Item Added Successfully');
                    getlist();
                    setOpen(false);
                    setCategory('');
                    setMenuName('');
                    setPrice('');
                    setQuantity('');
                    setStatus('Available');
                    setServingSize('Not Applicable'); 
                }else {
                    await updateMenu(menuId, menu);
                    toast.success('Menu Item Updated Successfully');
                    getlist();
                    setOpen(false);
                    setCategory('');
                    setMenuName('');
                    setPrice('');
                    setQuantity('');
                    setStatus('Available');
                    setServingSize('Not Applicable'); 
                }
            } catch (error) {
                toast.error(error.message);
            }
    }
 
    // useEffect(() => {
    //     firebase.collection('menus').orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
    //     setMenus(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    //     )
    // }, [])


    useEffect(() => {
        getlist();
    }, []);
    return (
        <Container className={classes.container}>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                        All Menu Items
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Add</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Category</TableCell>
                            <TableCell className={classes.head}>Name</TableCell>
                            <TableCell className={classes.head}>Price(₱)</TableCell>
                            <TableCell className={classes.head}>Quantity</TableCell>
                            <TableCell className={classes.head}>Serving Size</TableCell>
                            <TableCell className={classes.head}>Status</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menus.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <RiseLoader 
                                     css={override}
                                    size={20}
                                    color={"#073b9a"}
                                    loading={loading}/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {menus.map((menu) => (
                                <TableRow key={menu.id}>
                                  <TableCell>{menu.category}</TableCell>
                                  <TableCell>{menu.menuname}</TableCell>
                                  <TableCell>₱{menu.price}</TableCell>
                                  <TableCell>{menu.quantity}</TableCell>
                                  <TableCell>{menu.servingsize}</TableCell>
                                  <TableCell>{menu.status}</TableCell>
                                  
                                 
                                  <TableCell>
                                    <IconButton onClick={() => getOneMenu(menu.id)} color="primary" aria-label="update menu">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(menu.id)} color="secondary" aria-label="delete menu">
                                        <Delete />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                            ))}
                              
                            </>
                        )}
                        
                    </TableBody>
                </Table>  
            </TableContainer>
            <MenuDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                category={category}
                menuname={menuname}
                price={price}
                quantity={quantity}
                status={status}
                servingsize={servingsize}
                changeCategory={handleCategory}
                changeMenuName={handleMenuName}
                changePrice={handlePrice}
                changeQuantity={handleQuantity}
                changeServingSize={handleServingSize}
                changeStatus={handleStatus}
                addMenu={addMenuHandler}
            />
        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));


export default Menu;