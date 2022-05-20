import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const MenuDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Add New' : 'Update'}  Menu Item</DialogTitle>
            <ValidatorForm
                onSubmit={props.addMenu}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Category"
                            onChange={props.changeCategory}
                            name="category"
                            value={props.category}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Item Name"
                            onChange={props.changeMenuName}
                            name="menuname"
                            value={props.menuname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Price"
                                onChange={props.changePrice}
                                name="price"
                                type="number"
                                value={props.price}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Quantity"
                                onChange={props.changeQuantity}
                                name="quantity"
                                type="number"
                                value={props.quantity}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Serving Size:</FormLabel>
                                <RadioGroup aria-label="servingsize" name="servingsize" value={props.servingsize} onChange={props.changeServingSize}>
                                    <FormControlLabel value="Small" control={<Radio />} label="Small" />
                                    <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="Large" control={<Radio />} label="Large" />
                                    <FormControlLabel value="Not Applicable" control={<Radio />} label="Not Applicable" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup aria-label="status" name="status" value={props.status} onChange={props.changeStatus}>
                                <FormControlLabel value="Available" control={<Radio />} label="Available" />
                                <FormControlLabel value="Not Available" control={<Radio />} label="Not Available" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="secondary">
                       {props.formmode ? 'Add' : 'Update'}
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default MenuDialog;