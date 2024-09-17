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
import { GET_USER} from "@/graphql/features/users/actions";
import {useMutation} from "@apollo/client";
import * as React from "react";
import {useState} from "react";
import {CREATE_BOOK} from "@/graphql/features/users/books/actions.ts";
import {useParams} from "react-router-dom";
import {Loader} from "lucide-react";


const Create = () => {
    const params = useParams()
    const [open, setOpen] = useState(false)
    const [formState, setFormState] = useState({
        name: "",
    });

    const resetForm = () => {
        setFormState({
            name: '',
        })
    }

    const [createBook, {loading, error}] = useMutation(CREATE_BOOK, {
        refetchQueries: [
            GET_USER
        ],
        onCompleted: () => {
            setOpen(false)
            resetForm()

        }
    });

    const handleClose = () => {
        setOpen(false)
        resetForm()
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createBook({
            variables: {
                name: formState.name,
                userId:Number(params.id)
            },
        });

    };


    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                 <AlertDialogTrigger asChild>
                    <Button variant="outline" className={"w-fit"}>
                        + Create Book
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

                                <div
                                    className={
                                        "flex-row flex gap-1 justify-end"
                                    }
                                >
                                    <AlertDialogCancel onClick={handleClose}>
                                        Cancel
                                    </AlertDialogCancel>
                                    { loading ? <Loader/> :<Button type={"submit"}>Continue</Button>}
                                </div>
                                <div>
                                    {error && `Submission error! ${error?.message}`}
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Create;
