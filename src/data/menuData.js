import firebase from '../helpers/db';
import Menu from '../model/menu';



const firestore = firebase.firestore();

export const getMenuItems = async () => {
    try {
        const response = await firestore.collection('menus');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const menu = new Menu(
                doc.id,
                doc.data().category,
                doc.data().menuname,
                doc.data().price,
                doc.data().quantity,
                doc.data().servingsize,
                doc.data().status
            );

            array.push(menu);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addMenu = async (menu) => {
    try {
        await firestore.collection('menus').doc().set(menu);
    } catch (error) {
        throw error;
    }
}

export const getMenuItem = async (id) => {
    try {
        const menu = await firestore.collection('menus').doc(id);
        const data = await menu.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateMenu = async (id, data) => {
    try {
        const menu = await firestore.collection('menus').doc(id);
        await menu.update(data)
    } catch (error) {
        throw error;
    }
}  

export const deleteMenu = async (id) => {
    try {
        await firestore.collection('menus').doc(id).delete();
    } catch (error) {
        throw error;
    }
}