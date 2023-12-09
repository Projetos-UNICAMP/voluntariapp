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
import { handleErrorWithLogging } from '../errorHandler';

class UsuarioService implements IUsuarioAPI {
  private auth = getAuth();
  private db = getFirestore();
  private userCollection = collection(this.db, 'Usuarios');

  async cadastrarNovoUsuario(payload: PayloadNovoUsuario): Promise<boolean> {
    try {
      const { senha, email, ...userInfo } = payload;

      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, senha);

      await setDoc(doc(this.userCollection, userCredential.user.uid), {
        email,
        ...userInfo,
      });

      return true;
    } catch (error) {
      handleErrorWithLogging(error, 'Falha ao cadastrar novo usuário');
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
      handleErrorWithLogging(error, 'Falha ao fazer login');
      throw new Error('Failed to log in');
    }
  }

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

export const usuarioService = new UsuarioService();
