import React, { useState } from 'react';
import './tablet.scss';
import { Button } from 'react-bootstrap';
import { CreateCategoryPopup } from '../popups/ganre/CreateGanrePopup';
import { UpdateGanrePopup } from '../popups/ganre/UpdateGanrePopup';
import { ConfirmationPopup } from 'shared/components/popups/confirmation-popup/ConfirmationPopup';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { useSortBy, useTable } from 'react-table';
import { useColumns } from 'shared/hook/useColumns';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Ganre } from 'shared/models/ganre/Ganre';
import { GANRE_TABLE_COLUMNS } from './columns/ganreColumns';

interface Props {
  data: Ganre[];
  refresh: () => void;
}

export const GanreTable = (props: Props) => {
  const { data, refresh } = props;
  const columns = useColumns(GANRE_TABLE_COLUMNS);
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
  const [ganreToDelete, setGanreToDelete] = useState<Ganre>();

  const [ganre, setGanre] = useState<Ganre>();

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  }

  const onUpdateGanre = (cat: Ganre) => {
    setGanre(cat);
    setUpdateModalIsOpen(true);
  }

  const onDeleteGanre = (data: Ganre) => {
    setGanreToDelete(data);
    setConfirmatin(true);
  }

  const deleteGanre = (id: string) => {
    deleteRequest(`Ganre/Delete?id=${id}`)
      .then(() => {
        setConfirmatin(false);
        refresh();
      });
  }

  return (
    <div className="App">
      <div>
        <h2 className="adminPageTitle">Ganre</h2>
        <Button className="btn btn-success" onClick={openCreateModal}>Create Ganre</Button>
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
                    <Button className="btn btn-info btn-btnCategories" onClick={() => onUpdateGanre(row.original)}>Edit</Button>
                    <Button className="btn btn-danger btn-btnCategories" onClick={() => onDeleteGanre(row.original)}>Delete</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <CreateCategoryPopup modalIsOpen={createModalIsOpen} closeModal={() => setCreateModalIsOpen(false)} refresh={refresh} />
      {ganre && <UpdateGanrePopup modalIsOpen={updateModalIsOpen} closeModal={() => setUpdateModalIsOpen(false)} refresh={refresh} ganre={ganre} setGanre={setGanre} />}
      {ganreToDelete && <ConfirmationPopup onDelete={() => deleteGanre(ganreToDelete.id)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={ganreToDelete.name} ></ConfirmationPopup>}
    </div>
  );
}