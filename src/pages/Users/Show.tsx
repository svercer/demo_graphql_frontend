import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_USER} from "@/graphql/features/users/actions.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import Create from "@/components/modals/features/users/Books/Create.tsx";
import Delete from "@/components/modals/features/users/Books/Delete.tsx";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import Edit from "@/components/modals/features/users/books/Edit.tsx";

const Show = () => {

    const params = useParams()

    const {data, error, loading} = useQuery(GET_USER, {
        variables: {
            id: Number(params.id),
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className={'py-20'}>
            <Card className={'w-1/2'}>
                <CardHeader className={'flex flex-col items-start'}>
                    <CardTitle>{data.user.name}</CardTitle>
                    <CardDescription>{data.user.email}</CardDescription>
                </CardHeader>
                <CardContent className={'flex flex-col items-start'}>
                    Books:
                    <Table>
                        <TableCaption>A list of your recent Books.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.user.books.map(book => (
                                <TableRow key={book.id}>
                                    <TableCell align='left' className="font-medium">{book.id}</TableCell>
                                    <TableCell align='left'>{book.name} </TableCell>
                                    <TableCell align='left'>{book.prices[book.prices.length - 1]?.amount} </TableCell>
                                    <TableCell className={'flex flex-row gap-1 justify-end'}>
                                        <Edit book={book} />
                                        <Delete book={book}/>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Create>+ Add Book</Create>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Show;