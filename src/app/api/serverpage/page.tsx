import { getServerSession } from "next-auth";




export default async function serverSession(){
    const session = await getServerSession()
    console.log(session);

    return(
        <div>
            {session?.user?.name}
        </div>
    )
    
}