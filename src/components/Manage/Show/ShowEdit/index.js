import { useSearchParams } from "react-router-dom";
import ShowEditPro from "./ShowEditPro";
import ShowEditNews from "./ShowEditNews";
import ShowEditUser from "./ShowEditUser";


function ShowEdit() {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('Id');
    const type = searchParams.get('type');
    console.log(id);
    console.log(type);
    
        

    return (
        <>
            {type === 'product' && (
                <ShowEditPro id_pro={id}/>
            )}

            {type === 'news' && (
                <ShowEditNews id_new={id}/>
            )}

            {type === 'user' && (
                <ShowEditUser id_user={id}/>
            )}
        </>
    );
}

export default ShowEdit;