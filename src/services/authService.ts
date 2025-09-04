import bcrypt from 'bcryptjs';
import { supabase } from "../supabaseClient";

// Registrar novo usuário
export async function registerUser(email: string, password: string) {
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(password, salt);

  const { data, error } = await supabase
    .from('app_users')
    .insert([{ email, password_hash }]);

  return error ? { error } : { data };
}

// Login de usuário
export async function loginUser(email: string, password: string) {
  const { data: user, error } = await supabase
    .from('app_users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) return { error };

  const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
  return isPasswordValid
    ? { user }
    : { error: 'Senha incorreta' };
}