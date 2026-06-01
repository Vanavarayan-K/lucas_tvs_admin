import React, { useCallback, useEffect, useState } from 'react';
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
    Tooltip,
    Chip,
    Switch,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { reportService } from '../_services/reports';
import api from '../_services/api';
import SnackBar from '../components/SnackBar/SnackBar';
import SessionExpired from '../components/SessionExpired';

function ReportFormDialog({ open, onClose, onSubmit, initialValues }) {
    const isEdit = Boolean(initialValues?.id);
    const [name, setName] = useState('');
    const [portalId, setPortalId] = useState('');
    const [nameError, setNameError] = useState('');
    const [portals, setPortals] = useState([]);
    const [loadingPortals, setLoadingPortals] = useState(false);

    useEffect(() => {
        setName(initialValues?.name || '');
        setPortalId(initialValues?.portalId || '');
        setNameError('');
    }, [initialValues, open]);

    useEffect(() => {
        if (!open) return;
        setLoadingPortals(true);
        api.get('portals')
            .then((res) => setPortals(res?.data?.data || []))
            .catch(() => {})
            .finally(() => setLoadingPortals(false));
    }, [open]);

    const handleSave = () => {
        if (!name.trim() || name.trim().length < 2) {
            setNameError('Report name must be at least 2 characters');
            return;
        }
        onSubmit({ name: name.trim(), portalId: portalId || null });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                {isEdit ? 'Edit Report' : 'Create Report'}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Report Name"
                    fullWidth
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError(''); }}
                    error={Boolean(nameError)}
                    helperText={nameError}
                />
                <FormControl fullWidth size="small">
                    <InputLabel id="portal-label">Portal</InputLabel>
                    <Select
                        labelId="portal-label"
                        label="Portal"
                        value={portalId}
                        onChange={(e) => setPortalId(e.target.value)}
                        disabled={loadingPortals}
                        endAdornment={loadingPortals ? <CircularProgress size={16} sx={{ mr: 3 }} /> : null}
                    >
                        <MenuItem value="">
                            <em>Global (no portal)</em>
                        </MenuItem>
                        {portals.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [editReport, setEditReport] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

    const showSnack = (message, severity = 'success') =>
        setSnack({ open: true, message, severity });

    const loadReports = useCallback(async () => {
        const res = await reportService.getReports();
        if (res?.status === 200) {
            setReports((res.data.data || []).filter(Boolean));
        } else if (res?.status === 401) {
            setSessionExpired(true);
        } else {
            showSnack(res?.data?.message || 'Failed to fetch reports', 'error');
        }
    }, []);

    useEffect(() => { loadReports(); }, [loadReports]);

    const handleFormSubmit = async ({ name, portalId }) => {
        let res;
        if (editReport) {
            res = await reportService.updateReport(editReport.id, { name, portalId });
        } else {
            res = await reportService.createReport({ name, portalId });
        }

        if (res?.status === 200) {
            showSnack(`Report ${editReport ? 'updated' : 'created'} successfully`);
            setFormOpen(false);
            setEditReport(null);
            loadReports();
        } else {
            showSnack(res?.data?.message || `Failed to ${editReport ? 'update' : 'create'} report`, 'error');
        }
    };

    const handleToggleStatus = async (row) => {
        const newStatus = row.status === 'active' ? 'inactive' : 'active';
        const res = await reportService.updateReport(row.id, { status: newStatus });
        if (res?.status === 200) {
            showSnack(`Report ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
            loadReports();
        } else {
            showSnack(res?.data?.message || 'Failed to update status', 'error');
        }
    };

    const columns = [
        { field: 'name', headerName: 'Report Name', flex: 1, minWidth: 200 },
        {
            field: 'portalName',
            headerName: 'Portal',
            width: 160,
            renderCell: (params) =>
                params.value ? (
                    <Chip label={params.value} size="small" variant="outlined" />
                ) : (
                    <Typography variant="caption" color="text.secondary">Global</Typography>
                ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Switch
                        size="small"
                        checked={params.row.status === 'active'}
                        onChange={() => handleToggleStatus(params.row)}
                        color="success"
                    />
                    <Typography variant="caption" color={params.row.status === 'active' ? 'success.main' : 'text.secondary'}>
                        {params.row.status === 'active' ? 'Active' : 'Inactive'}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 150,
            renderCell: (params) =>
                params.value ? new Date(params.value).toLocaleDateString() : '—',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <Tooltip title="Edit Report">
                    <IconButton
                        size="small"
                        onClick={() => { setEditReport(params.row); setFormOpen(true); }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Reports</Typography>
                <Button
                    variant="contained"
                    onClick={() => { setEditReport(null); setFormOpen(true); }}
                >
                    Create Report
                </Button>
            </Box>

            <DataGrid
                rows={reports}
                columns={columns}
                getRowId={(row) => row.id}
                autoHeight
                pageSizeOptions={[10, 25, 50]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
            />

            <ReportFormDialog
                open={formOpen}
                onClose={() => { setFormOpen(false); setEditReport(null); }}
                onSubmit={handleFormSubmit}
                initialValues={editReport}
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
