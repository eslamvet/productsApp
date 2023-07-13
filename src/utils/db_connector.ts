import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

async function dbConnectionHandler(){
    try {
        global.db = await openDatabase({name: 'product_db.db', createFromLocation: 1});
    } catch (error) {
        Alert.alert('data base connection error')
    }
}

export default dbConnectionHandler