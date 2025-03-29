import { Input } from "../components/Input"
import { Button } from "../components/Button"

export function SignIn(){
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center p-4">
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 md:p-8 w-full max-w-md transition-all duration-300 hover:shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign In</h2>

                <div className="space-y-4">
                    <Input placeholder={"Username"} onChange={()=> {}}/>
                    <Input placeholder={"Password"} onChange={()=> {}}/>
                </div>

                <div className="mt-6">
                    <Button fullWidth={true} loading={false} size={"sm"} variant={"primary"} text={"Sign In"} />
                </div>
            </div>
        </div>
    )
}