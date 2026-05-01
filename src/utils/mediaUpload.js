import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseConnection = createClient(url , key);

export default async function uploadMedia(file) {
    if (!file) throw "No file selected";

    const timeStamp = new Date().getTime();
    const fileName =  timeStamp + "_" + file.name;
    const bucketName = "images";

    const { data, error } = await supabaseConnection.storage.from(bucketName).upload(fileName, file, {upsert : false, cacheControl : "3600"});

    if (error) throw error;

    const mediaUrl = supabaseConnection.storage.from(bucketName).getPublicUrl(fileName).data.publicUrl;
    return mediaUrl;
}

//*** MERN Course Fun Logic ***
// export default function uploadMedia(file){
//     return new Promise(
//         (resolve , reject)=>{
//             if(file == null){
//                 reject({
//                     message : "No file selectes"
//                 });
//             }else{

//                 const timeStamp = new Date().getTime();
//                 const fileName =  timeStamp + "_" + file.name;
//                 const bucketName = "images";

//                 supabaseConnection.storage.from(bucketName).upload(fileName , file , {
//                     upsert : false,
//                     cacheControl : "3600"
//                 }).then(
//                     ()=>{
//                         const mediaUrl = supabaseConnection.storage.from(bucketName).getPublicUrl(fileName).data.publicUrl;
//                         resolve(mediaUrl);
//                     }
//                 ).catch(
//                     (error)=>{
//                         reject(error);
//                     }
//                 )
//             }
//         }
//     )
// }