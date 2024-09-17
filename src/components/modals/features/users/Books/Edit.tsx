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
import {Book} from "@/types/Book.ts";
import {EDIT_BOOK} from "@/graphql/features/users/books/actions.ts";


const Edit = ({book}: { book: Book }) => {
    const [open, setOpen] = useState(false)

    const [formState, setFormState] = useState({
        name: book.name,
        price: book.prices[book.prices.length - 1]?.amount,
    });

    const [updateBook, {loading, error}] = useMutation(EDIT_BOOK, {
        refetchQueries: [
            GET_USER
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
        await updateBook({
            variables: {
                id: book.id,
                name: formState.name,
                price: formState.price,
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
                        <AlertDialogTitle>Update Book</AlertDialogTitle>
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
                                    type="text"
                                    placeholder="Email"
                                    value={formState.price}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            price: e.target.value,
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
