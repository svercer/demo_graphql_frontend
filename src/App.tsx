import './App.css'
import {useQuery} from '@apollo/client';
import {User} from "./types/User.ts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {GET_USERS} from "@/graphql/features/users/actions.ts";
import Create from "@/components/modals/features/users/Create.tsx";
import Delete from './components/modals/features/users/Delete.tsx';
import Edit from './components/modals/features/users/Edit.tsx';


function App() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {loading, error, data} = useQuery<{ users: { data: User[], meta: any } }>(GET_USERS, {
        variables: {
            pageSize: '50',
            page: 1
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    
    return (
        <div className={'py-20 px-20 flex flex-col gap-5'}>
            <Create/>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.users.data.map(user => (
                        <TableRow key={user.id}>
                            <TableCell align='left' className="font-medium">{user.id}</TableCell>
                            <TableCell align='left'>{user.name} </TableCell>
                            <TableCell align='left'>{user.email}</TableCell>
                            <TableCell className={'flex flex-row gap-1 justify-end'}>
                                <Edit user={user}/>
                                <Delete user={user}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default App
