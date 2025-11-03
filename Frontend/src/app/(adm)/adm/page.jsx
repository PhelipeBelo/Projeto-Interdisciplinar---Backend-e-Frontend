"use client";

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'; 
import Link from 'next/link';
import './dashboard.css';

const API_BASE_URL = "http://localhost:3001"; 
const API_URLS = {
    LIST: `${API_BASE_URL}/produtos`, 
    CREATE: `${API_BASE_URL}/adm/adicionar`, 
    UPDATE: `${API_BASE_URL}/adm/editar/`, 
    DELETE: `${API_BASE_URL}/adm/`, 
};
const AUTH_TOKEN = 'oi';

const initialFormState = {
    nome: '',
    marca: '',
    fabricante: '', 
    categorias: '', 
    'sub-categorias': '',
    img: '',
    preco: '',
    des: '',
};

const mapFormToBackend = (formData) => {
    let bodyData = { ...formData };
    
    const precoNumerico = parseFloat(bodyData.preco);
    if (!isNaN(precoNumerico)) {
        bodyData.preco = `R$ ${precoNumerico.toFixed(2).replace('.', ',')}`;
    } else {
        bodyData.preco = 'R$ 0,00';
    }

    bodyData.nome = bodyData.nome || '';
    bodyData.marca = bodyData.marca || '';
    bodyData.fabricante = bodyData.fabricante || '';
    bodyData.categorias = bodyData.categorias || '';
    bodyData['sub-categorias'] = bodyData['sub-categorias'] || ''; 
    bodyData.img = bodyData.img || '';
    bodyData.des = bodyData.des || '';
    
    return bodyData;
};

const mapBackendToForm = (item) => {
    let precoParaInput = '';
    if (typeof item.preco === 'string') {
        precoParaInput = item.preco.replace('R$', '').replace(',', '.').trim();
    }
    
    return {
        id: item.id || null,
        nome: item.nome || '',
        marca: item.marca || '',
        fabricante: item.fabricante || '',
        categorias: item.categorias || '',
        'sub-categorias': item['sub-categorias'] || '', 
        img: item.img || '',
        preco: precoParaInput, 
        des: item.des || '',
    };
};

const ItemForm = ({ isEditing, formData, handleChange, handleSave, title, buttonText, error }) => (
    <div className="modal-content">
        <div className="modal-header bg-nexus-dark text-white">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onSubmit={handleSave}>
            <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nome" className="form-label">Nome *</label>
                        <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="marca" className="form-label">Marca</label>
                        <input type="text" className="form-control" id="marca" name="marca" value={formData.marca} onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="fabricante" className="form-label">Fabricante</label>
                        <input type="text" className="form-control" id="fabricante" name="fabricante" value={formData.fabricante} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="categorias" className="form-label">Categoria</label>
                        <input type="text" className="form-control" id="categorias" name="categorias" value={formData.categorias} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="sub-categorias" className="form-label">Sub-Categoria</label>
                        <input type="text" className="form-control" id="sub-categorias" name="sub-categorias" value={formData['sub-categorias']} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="preco" className="form-label">Preço (R$)</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="preco" 
                            name="preco" 
                            value={String(formData.preco)} 
                            onChange={handleChange} 
                            step="0.01" 
                            required 
                        />
                    </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">URL da Imagem</label>
                    <input type="url" className="form-control" id="img" name="img" value={formData.img} onChange={handleChange} />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="des" className="form-label">Descrição *</label>
                    <textarea className="form-control" id="des" name="des" rows="4" value={formData.des} onChange={handleChange} required></textarea>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" 
                        className="btn btn-secondary" 
                        data-bs-dismiss="modal"> 
                    Cancelar
                </button>
                <button type="submit" className="btn btn-nexus-primary">
                    <i className="bi bi-floppy me-1"></i> {buttonText}
                </button>
            </div>
        </form>
    </div>
);

const ItemsDashboard = () => {
    
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    
    const [createFormData, setCreateFormData] = useState(initialFormState);
    const [createError, setCreateError] = useState(null);
    
    const [editFormData, setEditFormData] = useState(initialFormState);
    const [editError, setEditError] = useState(null);
    
    const [createModal, setCreateModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
            const response = await fetch(API_URLS.LIST); 
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ${response.status}. Detalhe: ${errorText.substring(0, 100)}...`);
            }
            
            const data = await response.json();
            setItems(data); 
        } catch (err) {
            console.error("Erro ao buscar itens:", err);
            setFetchError(`Falha na comunicação: ${err.message}. Verifique o Backend.`); 
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadBootstrapModals = () => {
            if (typeof window !== 'undefined' && window.bootstrap && window.bootstrap.Modal) {
                const createEl = document.getElementById('createItemModal');
                const editEl = document.getElementById('editItemModal');

                if (createEl) {
                    const cModal = new window.bootstrap.Modal(createEl, { backdrop: 'static', keyboard: false });
                    setCreateModal(cModal);
                    createEl.addEventListener('hidden.bs.modal', () => setCreateFormData(initialFormState));
                }

                if (editEl) {
                    const eModal = new window.bootstrap.Modal(editEl, { backdrop: 'static', keyboard: false });
                    setEditModal(eModal);
                    editEl.addEventListener('hidden.bs.modal', () => setEditFormData(initialFormState));
                }
            }
        };

        loadBootstrapModals();
        fetchItems();

    }, [fetchItems]);

    const handleCreateClick = () => {
        setCreateFormData(initialFormState);
        setCreateError(null);
        createModal && createModal.show();
    };

    const handleEditClick = (item) => {
        const itemParaForm = mapBackendToForm(item);
        setEditFormData(itemParaForm);
        setEditError(null);
        editModal && editModal.show();
    };

    const handleCreateChange = (e) => {
        const { id, value, type, name } = e.target;
        const fieldName = name || id; 
        const val = type === 'number' ? (value === '' ? '' : parseFloat(value)) : String(value);
        setCreateFormData(prev => ({ ...prev, [fieldName]: val }));
    };

    const handleEditChange = (e) => {
        const { id, value, type, name } = e.target;
        const fieldName = name || id; 
        const val = type === 'number' ? (value === '' ? '' : parseFloat(value)) : String(value);
        setEditFormData(prev => ({ ...prev, [fieldName]: val }));
    };
    
    const handleCreateSave = async (e) => {
        e.preventDefault(); 
        setCreateError(null);
        
        const bodyData = mapFormToBackend(createFormData);

        try {
            const response = await fetch(API_URLS.CREATE, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': AUTH_TOKEN 
                },
                body: JSON.stringify(bodyData), 
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.erro || `Falha ${response.status} ao criar o produto.`);
            }
            
            createModal.hide(); 
            alert('Produto adicionado com sucesso!');
            fetchItems(); 
        } catch (err) {
            setCreateError(`Erro: ${err.message}`);
        }
    };

    const handleEditSave = async (e) => {
        e.preventDefault(); 
        setEditError(null);
        
        const id = editFormData.id;
        if (!id) return;

        const bodyData = mapFormToBackend(editFormData);
        delete bodyData.id; 

        try {
            const response = await fetch(`${API_URLS.UPDATE}${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': AUTH_TOKEN 
                },
                body: JSON.stringify(bodyData), 
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.erro || `Falha ${response.status} ao editar o produto.`);
            }
            
            editModal.hide(); 
            alert('Produto editado com sucesso!');
            fetchItems(); 
        } catch (err) {
            setEditError(`Erro: ${err.message}`);
        }
    };
    
    const handleDelete = async (itemId) => {
        if (!window.confirm(`Tem certeza que deseja deletar o produto ${itemId}?`)) return;

        try {
            const response = await fetch(`${API_URLS.DELETE}${itemId}`, {
                method: 'DELETE',
                headers: { 'Authorization': AUTH_TOKEN }
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.erro || 'Falha ao deletar o produto.');
            }
            
            alert(`Produto ${itemId} deletado com sucesso!`);
            fetchItems(); 
        } catch (err) {
            alert(`Erro: ${err.message}`);
        }
    };

    const renderItemCard = (produto) => {
        const imgSrc = produto.img || 'https://via.placeholder.com/300x200/D3E0EA/276678?text=Sem+Imagem';
        const precoDisplay = produto.preco || 'R$ 0,00'; 
        const subCategorias = produto['sub-categorias'] || 'N/A'; 

        return (
            <div className="col" key={produto.id}>
                <div className="card shadow-sm h-100 product-card">
                    <div className="img-container">
                        <img 
                            src={imgSrc} 
                            className="card-img-top" 
                            alt={produto.nome || 'Produto sem nome'}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200/D3E0EA/276678?text=Imagem+N/A'; }}
                        />
                    </div>
                    <div className="card-body d-flex flex-column">
                        <p className='mb-1 fw-bold text-dark small'>{produto.marca || 'N/A'} - ID: {produto.id}</p>
                        <small className="text-nexus-dark fw-bold mb-2">{produto.categorias || 'N/A'} / {subCategorias}</small>
                        
                        <h5 className="card-title text-nexus-dark">{produto.nome || 'Produto Desconhecido'}</h5>
                        
                        <div className="d-flex justify-content-between align-items-center mb-3 mt-auto pt-2 border-top">
                            <span className="h4 fw-bold text-nexus-accent mb-0">{precoDisplay}</span>
                        </div>

                        <div className="d-grid gap-2 d-md-flex justify-content-center">
                            <button 
                                type="button" 
                                className="btn btn-sm btn-outline-nexus-dark w-100" 
                                onClick={() => handleEditClick(produto)}
                            >
                                <i className="bi bi-pencil-square me-1"></i> Editar
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-sm btn-outline-danger w-100" 
                                onClick={() => handleDelete(produto.id)}
                            >
                                <i className="bi bi-trash me-1"></i> Deletar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
            </Head>

            <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-2 shadow bg-nexus-dark">
                <Link href="/dashboard" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
                    📦 Admin Produtos
                </Link>
                <span className="navbar-text text-white ms-auto pe-3">Gestão de Estoque</span>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-12 px-md-4 py-4">
                        <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-4 border-bottom">
                            <h2 className='fw-light'>Catálogo de Produtos</h2>
                            <button 
                                type="button" 
                                className="btn btn-nexus-primary" 
                                onClick={handleCreateClick} 
                            >
                                <i className="bi bi-plus-circle-fill me-2"></i> Adicionar Produto
                            </button>
                        </div>

                        {isLoading && (<div className="alert alert-info text-center">Carregando...</div>)}
                        {fetchError && (
                            <div className="alert alert-danger text-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i> **{fetchError}**
                            </div>
                        )}
                        {!isLoading && !fetchError && items.length === 0 && (
                            <div className="alert alert-warning text-center">Nenhum produto cadastrado.</div>
                        )}

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                            {items.map(renderItemCard)}
                        </div>
                    </main>
                </div>
            </div>
            
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>

            <div className="modal fade" id="createItemModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <ItemForm
                        isEditing={false}
                        formData={createFormData}
                        handleChange={handleCreateChange}
                        handleSave={handleCreateSave}
                        title="Adicionar Novo Produto"
                        buttonText="Criar Produto"
                        error={createError}
                    />
                </div>
            </div>

            <div className="modal fade" id="editItemModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <ItemForm
                        isEditing={true}
                        formData={editFormData}
                        handleChange={handleEditChange}
                        handleSave={handleEditSave}
                        title={`Editar Produto ID: ${editFormData.id || 'N/A'}`}
                        buttonText="Salvar Alterações"
                        error={editError}
                    />
                </div>
            </div>
        </>
    );
};

export default ItemsDashboard;