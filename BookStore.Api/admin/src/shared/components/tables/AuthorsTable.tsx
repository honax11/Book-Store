import React, { useEffect, useState } from 'react';
import './tablet.scss';
import { Button } from 'react-bootstrap';
import { CreateDesignerPopup } from '../popups/Author/CreateDesignerPopup';
import { UpdateAuthorPopup } from '../popups/Author/UpdateAuthorPopup';
import { Link } from 'react-router-dom';
import { ConfirmationPopup } from 'shared/components/popups/confirmation-popup/ConfirmationPopup';
import { deleteRequest, get } from 'shared/services/HTTPUserService';
import { useColumns } from 'shared/hook/useColumns';
import { useSortBy, useTable } from 'react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { AUTHORS_TABLE_COLUMNS } from './columns/authorsColumns';
import { UpdateAuthorView } from 'shared/models/author/UpdateAuthorView';
import { Author } from 'shared/models/author/Author';
import { Genre } from 'shared/models/genre/Genre';

interface Props {
  data: Author[];
  refresh: () => void;
}

export const AuthorsTable = (props: Props) => {
  const { data, refresh } = props;

  const columns = useColumns(AUTHORS_TABLE_COLUMNS);
  const table = useTable({ columns, data }, useSortBy);

  useEffect(() => {
    getAllAuthor()
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);

  const [confirmation, setConfirmatin] = useState(false);

  const [authorToDelete, setAuthorToDelete] = useState<Author>();
  const [authorToUpdate, setAuthorToUpdate] = useState<UpdateAuthorView>();
  const [author, setAuthor] = useState<Author>();

  const [ganres, setGanres] = useState<Genre[]>([]);


  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  }

  const onDeleteAuthor = (author: Author) => {
    setAuthorToDelete(author);
    setConfirmatin(true);
  }

  const deleteAuthor = (id: string) => {
    debugger;
    deleteRequest(`Author/Delete?id=${id}`)
      .then(() => {
        setConfirmatin(false);
        refresh();
      });
  }

  const onUpdateAuthor = (author: Author) => {
    debugger;
    setAuthor(author);
    setUpdateModalIsOpen(true);
  }

  const getAllAuthor = () => {
    get(`Author/GetAll`)
      .then((response) => {
        setGanres(response);
      });
  }

  return (
    <div className="App">
      <div>
        <h2 className="adminPageTitle">Authors</h2>
        <Button className="btn btn-success" onClick={openCreateModal}>Create Author</Button>
      </div>
      <table {...getTableProps()}>
        <thead >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? <FaArrowUp className='ms-2' /> : <FaArrowDown className='ms-2' />) : ""}</span>
                </th>
              ))}
              <td>Actions</td>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                  <td className="admin-panel-order-table">
                    <Link className="btn btn-info" to={`/admin/author/${row.original.id}`}>Open</Link>
                    <Button className="btn btn-warning" onClick={() => onUpdateAuthor(row.original)}>Edit</Button>
                    <Button className="btn btn-danger" onClick={() => onDeleteAuthor(row.original)}>Delete</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {ganres && <CreateDesignerPopup ganresAll={ganres} modalIsOpen={createModalIsOpen} closeModal={() => setCreateModalIsOpen(false)} refresh={refresh} />}
      {author && <UpdateAuthorPopup modalIsOpen={updateModalIsOpen} closeModal={() => setUpdateModalIsOpen(false)} refresh={refresh} author={author} setAuthor={setAuthor} />}
      {authorToDelete && <ConfirmationPopup onDelete={() => deleteAuthor(authorToDelete.id)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={authorToDelete.firstName + " " + authorToDelete.secondName} ></ConfirmationPopup>}
    </div>
  );
}