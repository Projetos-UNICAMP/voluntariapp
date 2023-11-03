import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import {
  IUsuarioAPI,
  InformacoesUsuario,
  PayloadNovoUsuario,
} from '../usuarios.api';

class UsuarioService implements IUsuarioAPI {
  private auth = getAuth();
  private db = getFirestore();
  private userCollection = collection(this.db, 'Usuarios');

  async cadastrarNovoUsuario(payload: PayloadNovoUsuario): Promise<boolean> {
    try {
      // Remove the senha property before saving to Firestore
      const { senha, email, ...userInfo } = payload;

      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, senha);

      // Create a document in the "Usuarios" collection with the UID as the document ID
      await setDoc(doc(this.userCollection, userCredential.user.uid), {
        email,
        ...userInfo,
      });

      return true;
    } catch (error) {
      console.error('Error in user registration:', error);
      return false;
    }
  }

  async loginComEmailESenha(
    email: string,
    senha: string
  ): Promise<InformacoesUsuario> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        senha
      );
      const userDocRef = doc(this.db, 'Usuarios', userCredential.user.uid);
      const userInfo = await this.getUserInfo(userDocRef);

      return userInfo;
    } catch (error) {
      console.error('Error in user login:', error);
      throw new Error('Failed to log in');
    }
  }

  // Utility function to get user information from Firestore
  private async getUserInfo(
    userDocRef: DocumentReference<DocumentData, DocumentData>
  ): Promise<InformacoesUsuario> {
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data() as InformacoesUsuario;
      return userData;
    } else {
      throw new Error('User data not found');
    }
  }
}

// Export an instance of the service
export const usuarioService = new UsuarioService();
