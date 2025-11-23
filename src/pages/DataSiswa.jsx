import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

export default function DataSiswa() {
    const [search, setSearch] = useState("");
    const [dataSiswa, setDataSiswa] = useState([]);
    const [filteredDataSiswa, setFilteredDataSiswa] = useState([]);

    const [idEdit, setIdEdit] = useState(null);
    const [kodeSiswa, setKodeSiswa] = useState("");
    const [namaSiswa, setNamaSiswa] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tglSiswa, setTglSiswa] = useState("");
    const [jurusan, setJurusan] = useState("");

    const fetchData = () => {
    axios
      .get(`http://localhost:3000/data-siswa`)
      .then((response) => {
        setDataSiswa(response.data);
        setFilteredDataSiswa(response.data);
      })
      .catch((error) => console.error("Gagal mengambil data!", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // search filter
  const handleSearch = () => {
    const txt = search.toLowerCase();
    const result = dataSiswa.filter(
      (item) =>
        item.nama_siswa.toLowerCase().includes(txt) ||
        item.jurusan.toLowerCase().includes(txt)
    );
    setFilteredDataSiswa(result);
  };

  const clearForm = () => {
    setIdEdit(null);
    setKodeSiswa("");
    setNamaSiswa("");
    setAlamat("");
    setTglSiswa("");
    setJurusan("");
  };

  const openCreateModal = () => {
    clearForm();
    const modal = Modal.getOrCreateInstance("#modalDataSiswa");
    modal.show();
  };

  const openEditModal = (data) => {
    setIdEdit(data.id);
    setKodeSiswa(data.kode_siswa);
    setNamaSiswa(data.nama_siswa);
    setAlamat(data.alamat);
    setTglSiswa(data.tgl_siswa);
    setJurusan(data.jurusan); 

    const modal = Modal.getOrCreateInstance("#modalDataSiswa");
    modal.show();
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      kode_siswa: kodeSiswa,
      nama_siswa: namaSiswa,
      alamat: alamat,
      tgl_siswa: tglSiswa,
      jurusan: jurusan,
    };

    const url = idEdit
      ? `http://localhost:3000/data-siswa/${idEdit}`
      : `http://localhost:3000/data-siswa`;

    const request = idEdit ? axios.put(url, data) : axios.post(url, data);

    request
      .then(() => fetchData())
      .catch((error) => console.error("Gagal menyimpan data!", error))
      .finally(() => {
        const modal = Modal.getOrCreateInstance("#modalDataSiswa");
        modal.hide();
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus data siswa ini?")) return;

    axios
      .delete(`http://localhost:3000/data-siswa/${id}`)
      .then(() => fetchData())
      .catch((err) => console.error("Gagal menghapus!", err));
  };

  return(
    <div className="container mt-4">
      <h3>Data Siswa</h3>

      {/* Search */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Cari nama siswa / jurusan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <button className="btn btn-primary mb-3" onClick={openCreateModal}>
        Tambah Data Siswa
      </button>

      {/* Tabel */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Siswa</th>
            <th>Nama Siswa</th>
            <th>Alamat</th>
            <th>Tanggal Siswa</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredDataSiswa.length > 0 ? (
            filteredDataSiswa.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.kode_siswa}</td>
                <td>{item.nama_siswa}</td>
                <td>{item.alamat}</td>
                <td>{new Date(item.tgl_siswa).toISOString().split("T")[0]}</td>
                <td>{item.jurusan}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr colSpan="8">
              <td colSpan={8} className="py-3 text-center text-secondary">
                Data tidak ada
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Tambah & Edit */}
      <div className="modal fade" id="modalDataSiswa" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {idEdit ? "Edit Data Siswa" : "Tambah Data Siswa"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>

              <div className="modal-body">
                <div className="form-floating mb-2">
                  <input
                  name="kode_siswa"
                    className="form-control"
                    placeholder="Kode Siswa"
                    value={kodeSiswa}
                    onChange={(e) => setKodeSiswa(e.target.value)}
                    required
                  />
                  <label>Kode Siswa</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                  name="nama_siswa"
                    className="form-control"
                    placeholder="Nama Siswa"
                    value={namaSiswa}
                    onChange={(e) => setNamaSiswa(e.target.value)}
                    required
                  />
                  <label>Nama Siswa</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                  name="alamat"
                    className="form-control"
                    placeholder="alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                  <label>Alamat</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                  name="tgl_siswa"
                  type="date"
                    className="form-control"
                    placeholder="Tanggal Siswa"
                    value={tglSiswa}
                    onChange={(e) => setTglSiswa(e.target.value)}
                    required
                  />
                  <label>Tanggal Siswa</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                  name="jurusan"
                    className="form-control"
                    placeholder="Jurusan"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    required
                  />
                  <label>Jurusan</label>
                </div>
                </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}