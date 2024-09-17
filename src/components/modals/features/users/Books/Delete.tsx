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
import {DELETE_USER, GET_USER, GET_USERS} from "@/graphql/features/users/actions";
import {User} from "@/types/User";
import {useMutation} from "@apollo/client";
import * as React from "react";
import {useState} from "react";
import {DELETE_BOOK} from "@/graphql/features/users/books/actions.ts";
import {Book} from "@/types/Book.ts";
import {Trash}from 'lucide-react'


const Delete = ({book}: { book: Book }) => {
    
    const [open, setOpen] = useState(false)

    const [deleteBook, {loading, error}] = useMutation(DELETE_BOOK, {
        refetchQueries: [
            GET_USER
        ],
        onCompleted: () => {
            setOpen(false)
        }
    });

    const handleClose = () => {
        setOpen(false)
    }

    const submit = async (e: React.FormEvent) => {

        e.preventDefault();

        await deleteBook({
            variables: {
                id: book.id
            },
        });


    };
    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" className={"w-fit"} size={'sm'}>
                        <Trash className={'w-4'} color={'red'}/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete book {book.name}</AlertDialogTitle>
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

                            {loading && 'Submitting...'}
                            {error && `Submission error! ${error?.message}`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Delete;