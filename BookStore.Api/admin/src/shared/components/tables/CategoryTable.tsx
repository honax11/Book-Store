import React, { useState } from 'react';
import './tablet.scss';
import { Button } from 'react-bootstrap';
import { CreateCategoryPopup } from '../popups/category/CreateCategoryPopup';
import { UpdateCategoryPopup } from '../popups/category/UpdateCategoryPopup';
import { Category } from 'shared/models/category/Category';
import { ConfirmationPopup } from 'shared/components/popups/confirmation-popup/ConfirmationPopup';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { useSortBy, useTable } from 'react-table';
import { useColumns } from 'shared/hook/useColumns';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { CATEGORIES_TABLE_COLUMNS } from './columns/categoryColumns';

interface Props {
  data: Category[];
  refresh: () => void;
}

export const CategoryTable = (props: Props) => {
  const { data, refresh } = props;
  const columns = useColumns(CATEGORIES_TABLE_COLUMNS);
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
  const [confirmation, setConfirmatin] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category>();

  const [category, setcategory] = useState<Category>();

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  }

  const onUpdateCategory = (cat: Category) => {
    setcategory(cat);
    setUpdateModalIsOpen(true);
  }

  const onDeleteCategory = (data: Category) => {
    setCategoryToDelete(data);
    setConfirmatin(true);
  }

  const deleteCategory = (id: string) => {
    deleteRequest(`Category/Delete?id=${id}`)
      .then(() => {
        setConfirmatin(false);
        refresh();
      });
  }

  return (
    <div className="App">
      <div>
        <h2 className="adminPageTitle">Categories</h2>
        <Button className="btn btn-success" onClick={openCreateModal}>Create Category</Button>
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
                    <Button className="btn btn-info btn-btnCategories" onClick={() => onUpdateCategory(row.original)}>Edit</Button>
                    <Button className="btn btn-danger btn-btnCategories" onClick={() => onDeleteCategory(row.original)}>Delete</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <CreateCategoryPopup modalIsOpen={createModalIsOpen} closeModal={() => setCreateModalIsOpen(false)} refresh={refresh} />
      {category && <UpdateCategoryPopup modalIsOpen={updateModalIsOpen} closeModal={() => setUpdateModalIsOpen(false)} refresh={refresh} category={category} setCategory={setcategory} />}
      {categoryToDelete && <ConfirmationPopup onDelete={() => deleteCategory(categoryToDelete.id)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={categoryToDelete.name} ></ConfirmationPopup>}
    </div>
  );
}