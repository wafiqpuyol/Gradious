import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { useToast } from "../hooks/use-toast"

const SignOutButton = () => {
    const { toast } = useToast();

    const { mutate } = useMutation({
        mutationFn: async () => {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/auth/signout`, {}, { withCredentials: true })
        },
        onSuccess: async () => {
            // await queryClient.invalidateQueries("validateToken");
            return toast({
                title: "Logout successful",
            })
        },
        onError: (err) => {
            return toast({
                title: err.message,
                description: "Please try again with different credentials",
                variant: "destructive"
            })
        },
    });

    const handleClick = () => {
        mutate();
    };

    return (
        <button
            onClick={handleClick}
            className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;