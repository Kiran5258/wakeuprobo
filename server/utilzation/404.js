export const errormsg=(status,msg)=>{
    const error=new Error()
    error.statusCode=status
    error.message=msg
    return error
}