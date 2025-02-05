import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { useProducts } from '../../context/ProductContextProvider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useCart } from '../../context/CartContextProvider';
import { useAuth } from '../../context/AuthContextProvider';
import { ADMIN } from '../../helpers/const';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pulse from 'react-reveal/Pulse';
import { Box } from '@mui/system';


export default function ProductCard({ item }) {
    const navigate = useNavigate();

    const { deleteProduct, like } = useProducts();
    const { addProductToCart, checkProductInCart } = useCart()

    const {
        handleLogout,
        user: { email },
      } = useAuth();

    return (
        <Pulse>
            <Card sx={{ maxWidth: 300, minHeight: 700, p: '10px', }} elevation={24}>
                <CardMedia
                    component="img"
                    height="400"
                    image={item.image}
                    alt={item.name}
                    onClick={() => navigate(`/courses/${item.id}`)}
                />
                <CardContent sx={{minHeight: 200}}>
                    <Typography sx={{minHeight: 85}} gutterBottom variant="h4" component="div">
                        {item.name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" sx={{
                        color: 'blue', fontWeight: '700',
                    }}>
                        {item.speciality}
                    </Typography>

                    <Typography gutterBottom variant="body2" component="div" sx={{
                        color: 'inherit', fontWeight: '700',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {item.description}
                </Typography> 
            </CardContent>
        {email == ADMIN ? (

            
                <CardActions>
                    <IconButton>
                        <DeleteOutlineIcon size="small" onClick={() => deleteProduct(item.id)} />
                    </IconButton>


                    <IconButton size="small" onClick={() => navigate(`/edit/${item.id}`)}>
                        <EditIcon />
                    </IconButton>

            </CardActions>
        ) : (
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>

            <Button variant='contained' onClick={() => addProductToCart(item)}
            color={checkProductInCart(item.id) ? 'success' : 'primary'}
            
            > Записаться на прием</Button>
            <Box mt={2} sx={{display: 'flex', alignItems: 'center'}}>

            <IconButton onClick={() => like(item.id)}>
                <FavoriteIcon  
            color='error'
            
            />
            </IconButton>
            <Typography>{item.likes}</Typography>
            </Box>
            </Box>
            )}
                    


            </Card>
        </Pulse>
    );
}
