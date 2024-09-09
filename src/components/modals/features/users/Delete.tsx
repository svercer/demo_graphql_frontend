import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input.tsx";
import {DELETE_USER, GET_USERS} from "@/graphql/features/users/actions";
import {User} from "@/types/User";
import {useMutation} from "@apollo/client";
import * as React from "react";
import {useState} from "react";


const Delete = ({user}: { user: User }) => {
    
    const [open, setOpen] = useState(false)

    const [deleteUser, {loading, error}] = useMutation(DELETE_USER, {
        refetchQueries: [
            GET_USERS
        ],
        onCompleted: () => {
            setOpen(false)
        }
    });

    const handleClose = () => {
        setOpen(false)
    }

    const submit = (e: React.FormEvent) => {

        e.preventDefault();

        deleteUser({
            variables: {
                id: user.id
            },
        });


    };
    return (
        <>
            {loading && 'Submitting...'}
            {error && `Submission error! ${error?.message}`}

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className={"w-fit"}>
                        Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete user {user.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form
                                onSubmit={submit}
                                className={"flex flex-col gap-3"}
                            >
                                <div
                                    className={
                                        "flex-row flex gap-1 justify-end"
                                    }
                                >
                                    <AlertDialogCancel onClick={handleClose}>
                                        Cancel
                                    </AlertDialogCancel>
                                    <Button type={"submit"}>Delete</Button>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Delete;