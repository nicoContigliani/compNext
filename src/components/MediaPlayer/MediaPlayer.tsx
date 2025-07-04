'use client'
import { useState, useEffect, useCallback } from 'react'
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  TextField, 
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  Button
} from '@mui/material'
import ReactPlayer from 'react-player/lazy'

interface Stream {
  id: string
  name: string
  logo?: string
  category?: string
  url: string
}

export default function MediaPlayer() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchStreams = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://iptv-org.github.io/iptv/channels.json')
      
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`)
      }
      
      const data = await response.json()
      
      const validStreams = data
        .filter((channel: any) => channel.url?.startsWith('http'))
        .map((channel: any) => ({
          id: channel.id || Math.random().toString(36).substring(7),
          name: channel.name || 'Canal sin nombre',
          logo: channel.logo,
          category: channel.category,
          url: channel.url
        }))
      
      setStreams(validStreams)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los canales')
      console.error('Error obteniendo streams:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStreams()
  }, [fetchStreams])

  const filteredStreams = streams.filter(stream =>
    stream.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (stream.category && stream.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    fetchStreams()
  }

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream)
    setError(null)
  }

  // Resto del componente permanece igual...
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ ml: 2 }}>Cargando canales...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.includes('404') ? 'Recurso no encontrado' : error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={handleRetry}
          sx={{ mt: 2 }}
        >
          Reintentar
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Si el problema persiste, el servicio puede estar temporalmente no disponible.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar con lista de canales */}
      <Paper sx={{ 
        width: { xs: '100%', md: '350px' }, 
        overflowY: 'auto',
        bgcolor: 'background.paper'
      }}>
        <Box p={2} sx={{ position: 'sticky', top: 0, bgcolor: 'inherit', zIndex: 1 }}>
          <TextField
            fullWidth
            label="Buscar canales"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
        
        <List dense>
          {filteredStreams.map((stream) => (
            <ListItem key={stream.id} disablePadding>
              <ListItemButton 
                onClick={() => handleStreamSelect(stream)}
                selected={selectedStream?.id === stream.id}
                sx={{ py: 1.5 }}
              >
                <Avatar 
                  src={stream.logo} 
                  alt={stream.name}
                  sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}
                  variant="square"
                >
                  {stream.name.charAt(0)}
                </Avatar>
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography noWrap variant="subtitle2">{stream.name}</Typography>
                  {stream.category && (
                    <Typography noWrap variant="caption" color="text.secondary">
                      {stream.category}
                    </Typography>
                  )}
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Área principal del reproductor */}
      <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
        {selectedStream ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Typography variant="h6">{selectedStream.name}</Typography>
              {selectedStream.category && (
                <Typography variant="body2" color="text.secondary">
                  {selectedStream.category}
                </Typography>
              )}
            </Box>
            
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2
            }}>
              <ReactPlayer
                url={selectedStream.url}
                controls
                width="100%"
                height="100%"
                style={{ maxHeight: '80vh' }}
                config={{
                  file: {
                    forceHLS: true,
                    hlsOptions: {
                      maxBufferLength: 30,
                      maxBufferSize: 60 * 1000 * 1000,
                      maxBufferHole: 10
                    }
                  }
                }}
                onError={(err) => {
                  setError(`Error al reproducir: ${err}`)
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            textAlign: 'center',
            p: 4
          }}>
            <Typography variant="h6">
              {filteredStreams.length > 0 ? 'Selecciona un canal' : 'No hay canales disponibles'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}