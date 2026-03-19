import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Typography,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Tooltip,
    Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import { roleService } from '../_services/roles';
import SnackBar from '../components/SnackBar/SnackBar';
import SessionExpired from '../components/SessionExpired';

const PERM_COLS = ['canView', 'canCreate', 'canEdit', 'canDelete'];
const PERM_LABELS = { canView: 'View', canCreate: 'Create', canEdit: 'Edit', canDelete: 'Delete' };

// ── Role Form Dialog ─────────────────────────────────────────────────────────
function RoleFormDialog({ open, onClose, onSubmit, initialValues }) {
    const isEdit = Boolean(initialValues?.id);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setName(initialValues?.name || '');
        setError('');
    }, [initialValues, open]);

    const handleSave = () => {
        if (!name.trim() || name.trim().length < 2) {
            setError('Role name must be at least 2 characters');
            return;
        }
        onSubmit({ name: name.trim() });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                {isEdit ? 'Edit Role' : 'Create Role'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Role Name"
                    fullWidth
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    error={Boolean(error)}
                    helperText={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

// ── Permissions Dialog ───────────────────────────────────────────────────────
function PermissionsDialog({ open, onClose, role, onSave }) {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (open && role) {
            setLoading(true);
            roleService.getRolePermissions(role.id).then((res) => {
                if (res?.status === 200) {
                    setPermissions(
                        (res.data.data || []).map((p) => ({
                            ...p,
                            canView: Boolean(p.canView),
                            canCreate: Boolean(p.canCreate),
                            canEdit: Boolean(p.canEdit),
                            canDelete: Boolean(p.canDelete),
                        }))
                    );
                }
                setLoading(false);
            });
        }
    }, [open, role]);

    const toggle = (reportId, field) => {
        setPermissions((prev) =>
            prev.map((p) =>
                p.reportId === reportId ? { ...p, [field]: !p[field] } : p
            )
        );
    };

    const toggleAllForReport = (reportId, checked) => {
        setPermissions((prev) =>
            prev.map((p) =>
                p.reportId === reportId
                    ? { ...p, canView: checked, canCreate: checked, canEdit: checked, canDelete: checked }
                    : p
            )
        );
    };

    const handleSave = async () => {
        if (!role) return;
        setSaving(true);
        await onSave(role.id, permissions);
        setSaving(false);
    };

    const isAllChecked = (reportId) => {
        const p = permissions.find((x) => x.reportId === reportId);
        return p ? PERM_COLS.every((c) => p[c]) : false;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                Permissions — {role?.name}
            </DialogTitle>
            <DialogContent>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Report / Menu</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>All</TableCell>
                                    {PERM_COLS.map((col) => (
                                        <TableCell key={col} align="center" sx={{ fontWeight: 'bold' }}>
                                            {PERM_LABELS[col]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {permissions.map((perm) => (
                                    <TableRow key={perm.reportId} hover>
                                        <TableCell>{perm.reportName}</TableCell>
                                        <TableCell align="center">
                                            <Checkbox
                                                size="small"
                                                checked={isAllChecked(perm.reportId)}
                                                indeterminate={
                                                    PERM_COLS.some((c) => perm[c]) &&
                                                    !PERM_COLS.every((c) => perm[c])
                                                }
                                                onChange={(e) => toggleAllForReport(perm.reportId, e.target.checked)}
                                            />
                                        </TableCell>
                                        {PERM_COLS.map((col) => (
                                            <TableCell key={col} align="center">
                                                <Checkbox
                                                    size="small"
                                                    checked={perm[col]}
                                                    onChange={() => toggle(perm.reportId, col)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Permissions'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ── Delete Confirm Dialog ────────────────────────────────────────────────────
function DeleteDialog({ open, onClose, onConfirm, role }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={{ p: 3, minWidth: 300 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Confirm Delete</Typography>
                <Typography>Are you sure you want to delete role "<strong>{role?.name}</strong>"?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={onConfirm}>Delete</Button>
                </Box>
            </Box>
        </Dialog>
    );
}

// ── Main Roles Page ──────────────────────────────────────────────────────────
export default function RolesPage() {
    const [roles, setRoles] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [editRole, setEditRole] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteRole, setDeleteRole] = useState(null);
    const [permRole, setPermRole] = useState(null);
    const [permOpen, setPermOpen] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

    const showSnack = (message, severity = 'success') =>
        setSnack({ open: true, message, severity });

    const loadRoles = async () => {
        const res = await roleService.getRoles();
        if (res?.status === 200) {
            setRoles((res.data.data || []).filter(Boolean));
        } else if (res?.status === 401) {
            setSessionExpired(true);
        } else {
            showSnack(res?.data?.message || 'Failed to fetch roles', 'error');
        }
    };

    useEffect(() => { loadRoles(); }, []);

    const handleFormSubmit = async ({ name }) => {
        let res;
        if (editRole) {
            res = await roleService.updateRole(editRole.id, { name });
        } else {
            res = await roleService.createRole({ name });
        }

        if (res?.status === 200) {
            showSnack(`Role ${editRole ? 'updated' : 'created'} successfully`);
            setFormOpen(false);
            setEditRole(null);
            loadRoles();
        } else {
            showSnack(res?.data?.message || `Failed to ${editRole ? 'update' : 'create'} role`, 'error');
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteRole) return;
        const res = await roleService.deleteRole(deleteRole.id);
        if (res?.status === 200) {
            showSnack('Role deleted successfully');
            loadRoles();
        } else {
            showSnack(res?.data?.message || 'Failed to delete role', 'error');
        }
        setDeleteDialogOpen(false);
        setDeleteRole(null);
    };

    const handleSavePermissions = async (roleId, permissions) => {
        const res = await roleService.updateRolePermissions(roleId, permissions);
        if (res?.status === 200) {
            showSnack('Permissions updated successfully');
            setPermOpen(false);
        } else {
            showSnack(res?.data?.message || 'Failed to update permissions', 'error');
        }
    };

    const columns = [
        { field: 'name', headerName: 'Role Name', flex: 1, minWidth: 200 },
        {
            field: 'portalId',
            headerName: 'Portal',
            width: 200,
            renderCell: (params) =>
                params.value ? (
                    <Chip label={params.value} size="small" variant="outlined" />
                ) : (
                    <Typography variant="caption" color="text.secondary">Global</Typography>
                ),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 180,
            renderCell: (params) =>
                params.value ? new Date(params.value).toLocaleDateString() : '—',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="Edit Role">
                        <IconButton
                            size="small"
                            onClick={() => { setEditRole(params.row); setFormOpen(true); }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Manage Permissions">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => { setPermRole(params.row); setPermOpen(true); }}
                        >
                            <SecurityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Role">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => { setDeleteRole(params.row); setDeleteDialogOpen(true); }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Roles</Typography>
                <Button
                    variant="contained"
                    onClick={() => { setEditRole(null); setFormOpen(true); }}
                >
                    Create Role
                </Button>
            </Box>

            <DataGrid
                rows={roles}
                columns={columns}
                getRowId={(row) => row.id}
                autoHeight
                pageSizeOptions={[10, 25, 50]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
            />

            <RoleFormDialog
                open={formOpen}
                onClose={() => { setFormOpen(false); setEditRole(null); }}
                onSubmit={handleFormSubmit}
                initialValues={editRole}
            />

            <PermissionsDialog
                open={permOpen}
                onClose={() => { setPermOpen(false); setPermRole(null); }}
                role={permRole}
                onSave={handleSavePermissions}
            />

            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => { setDeleteDialogOpen(false); setDeleteRole(null); }}
                onConfirm={handleDeleteConfirm}
                role={deleteRole}
            />

            <SessionExpired open={sessionExpired} />

            <SnackBar
                open={snack.open}
                severity={snack.severity}
                snackbarTitle={snack.message}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
            />
        </Box>
    );
}
