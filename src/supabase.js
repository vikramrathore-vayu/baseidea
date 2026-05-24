import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zrzbkshvrdlceasftmin.supabase.co';
const supabaseKey = 'sb_publishable_LgliVoRGjI2rQEOSU2GuaA_Zyb36kRg';
export const supabase = createClient(supabaseUrl, supabaseKey);
