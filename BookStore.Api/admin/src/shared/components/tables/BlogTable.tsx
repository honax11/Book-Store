import React, { useState } from 'react';
import './tablet.scss';
import { Button } from 'react-bootstrap';
import { Magazine } from 'shared/models/magazine/Magazine';
import { CreateArticlePopup } from '../popups/article/CreateArticlePopup';
import { UpdateArticlePopup } from '../popups/article/UpdateArticlePopup';
import { Link } from 'react-router-dom';
import { Category } from 'shared/models/category/Category';
import { ConfirmationPopup } from 'shared/components/popups/confirmation-popup/ConfirmationPopup';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { useColumns } from 'shared/hook/useColumns';
import { BLOGS_TABLE_COLUMNS } from './columns/blogColumns';
import { useSortBy, useTable } from 'react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface Props {
  data: Magazine[];
  categories: Category[];
  refresh: () => void;
}

export const BlogTable = (props: Props) => {
  const { data, categories, refresh } = props;

  const columns = useColumns(BLOGS_TABLE_COLUMNS);
  const table = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);

  const [magazine, setMagazine] = useState<Magazine>();

  const [confirmation, setConfirmatin] = useState(false);
  const [magazineToDelete, setMagazineToDelete] = useState<Magazine>();

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  }

  const onDeleteMagazine = (blog: Magazine) => {
    setMagazineToDelete(blog);
    setConfirmatin(true);
  }

  const deleteMagazine = (id: string) => {
    deleteRequest(`Magazine/Delete?id=${id}`)
      .then(() => {
        setConfirmatin(false);
        refresh();
      });
  }

  const onUpdateMagazine = (blog: Magazine) => {
    setMagazine(blog);
    setUpdateModalIsOpen(true);
  }

  return (
    <>
      <div className="App">
        <div>
          <h2 className="adminPageTitle">Blog</h2>
          <Button className="btn btn-success" onClick={openCreateModal}>Create Blog</Button>
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
                      <Link className="btn btn-info" to={`/admin/article/${row.original.id}`}>Open</Link>
                      <Button className="btn btn-info btn-btnCategories" onClick={() => onUpdateMagazine(row.original)}>Edit</Button>
                      <Button className="btn btn-danger btn-btnCategories" onClick={() => onDeleteMagazine(row.original)}>Delete</Button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <CreateArticlePopup categories={categories} modalIsOpen={createModalIsOpen} closeModal={() => setCreateModalIsOpen(false)} refresh={refresh} />
        {magazine && <UpdateArticlePopup categories={categories} modalIsOpen={updateModalIsOpen} closeModal={() => setUpdateModalIsOpen(false)} refresh={refresh} magazine={magazine} setMagazine={setMagazine} />}
        {magazineToDelete && <ConfirmationPopup onDelete={() => deleteMagazine(magazineToDelete.id)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={magazineToDelete.name}></ConfirmationPopup>}
      </div>
    </>
  );
}