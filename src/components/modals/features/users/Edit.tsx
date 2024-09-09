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
import {CREATE_USER, EDIT_USER, GET_USERS} from "@/graphql/features/users/actions";
import {User} from "@/types/User";
import {useMutation} from "@apollo/client";
import * as React from "react";
import {useState} from "react";


const Edit = ({user}: { user: User }) => {
    const [open, setOpen] = useState(false)

    const [formState, setFormState] = useState({
        name: user.name,
        email: user.email,
    });

    const [updateUser, {loading, error}] = useMutation(EDIT_USER, {
        refetchQueries: [
            GET_USERS
        ],

        onCompleted: () => {
            setOpen(false)
        },

    });

    const handleClose = () => {
        setOpen(false)
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateUser({
            variables: {
                id: user.id,
                name: formState.name,
                email: formState.email,
            },
        });
    };

    return (
        <>
            {loading && 'Submitting...'}
            {error && `Submission error! ${error?.message}`}

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className={"w-fit"}>
                        Edit
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create New User</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form
                                onSubmit={submit}
                                className={" flex flex-col gap-3"}
                            >
                                <Input
                                    type="name"
                                    placeholder="Name"
                                    value={formState.name}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={formState.email}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <div
                                    className={
                                        "flex-row flex gap-1 justify-end"
                                    }
                                >
                                    <AlertDialogCancel onClick={handleClose}>
                                        Cancel
                                    </AlertDialogCancel>
                                    <Button type={"submit"}>Save</Button>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Edit;
