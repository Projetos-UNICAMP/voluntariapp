import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { handleErrorWithLogging } from '../errorHandler';
import {
  IUsuarioAPI,
  InformacoesUsuario,
  PayloadNovoUsuario,
} from '../usuarios.api';
import { usuariosRoute } from './configuration';

class UsuarioService implements IUsuarioAPI {
  private readonly collectionName = usuariosRoute;
  private userCollection = collection(db, this.collectionName);

  async cadastrarNovoUsuario(payload: PayloadNovoUsuario): Promise<boolean> {
    try {
      const { senha, email, ...userInfo } = payload;

      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, senha);

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
        auth,
        email,
        senha
      );
      const userDocRef = doc(db, this.collectionName, userCredential.user.uid);
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
