import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bazarSlice";
import image1 from '../assets/affrique/af1.png';
import image2 from '../assets/affrique/af2.png';
import image3 from '../assets/amerique/am1.png';
import image4 from '../assets/amerique/am2.png';
import image5 from '../assets/Asie/as1.png';
import image6 from '../assets/Asie/as2.png';
import image7 from '../assets/europe/eu2.png';
import image8 from '../assets/europe/eu1.png';
import { ToastContainer, toast } from "react-toastify";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import Footer from '../comp/Footer'; // Importer le composant Footer
import Nav from '../comp/nav'; // Importer le composant Nav
import axios from 'axios';

const Shop = () => {
    const categories = ["Afrique", "Amérique", "Asie", "Europe"];
    const [activeCategory, setActiveCategory] = useState("Afrique");
    const [recommendation, setRecommendation] = useState({ name: '', email: '', message: '', file: null });
    const [filePath, setFilePath] = useState('');
    const dispatch = useDispatch();

    const products = [
        { id: 1, name: "Produit 1", price: 3.00, image: image1, category: "Afrique" },
        { id: 2, name: "Produit 2", price: 3.00, image: image2, category: "Afrique" },
        { id: 3, name: "Produit 3", price: 3.00, image: image3, category: "Amérique" },
        { id: 4, name: "Produit 4", price: 3.00, image: image4, category: "Amérique" },
        { id: 5, name: "Produit 5", price: 3.00, image: image5, category: "Asie" },
        { id: 6, name: "Produit 6", price: 3.00, image: image6, category: "Asie" },
        { id: 7, name: "Produit 7", price: 3.00, image: image7, category: "Europe" },
        { id: 8, name: "Produit 8", price: 3.00, image: image8, category: "Europe" },
    ];

    const handleRecommendationSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', recommendation.name);
        formData.append('email', recommendation.email);
        formData.append('message', recommendation.message);
        formData.append('file', recommendation.file);

        try {
            const response = await axios.post('https://basarwebsite.onrender.com/recommendations/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Votre recommandation a bien été reçue !");
            console.log("Recommandation soumise :", response.data);
            setFilePath(response.data.filePath);
            setRecommendation({ name: '', email: '', message: '', file: null });
        } catch (error) {
            toast.error("Erreur lors de la soumission de la recommandation");
            console.error("Erreur lors de la soumission de la recommandation :", error);
        }
    };

    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Continents
                        </Typography>
                        <Box>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    fullWidth
                                    variant={activeCategory === category ? "contained" : "outlined"}
                                    color="primary"
                                    onClick={() => setActiveCategory(category)}
                                    sx={{ mb: 1 }}
                                >
                                    {category}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={4}>
                            {products
                                .filter((product) => product.category === activeCategory)
                                .map((product) => (
                                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={product.image}
                                                alt={product.name}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" component="h3">
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {product.price} €
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    onClick={() => {
                                                        dispatch(
                                                            addToCart({
                                                                id: product.id,
                                                                title: product.name,
                                                                price: product.price,
                                                                image: product.image,
                                                                category: product.category,
                                                                quantity: 1,
                                                            })
                                                        );
                                                        toast.success(`${product.name} a été ajouté au panier`);
                                                    }}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Ajouter au panier
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Vous ne trouvez pas votre bonheur ?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Soumettez une recommandation de produit ci-dessous :
                    </Typography>
                    <Box component="form" onSubmit={handleRecommendationSubmit} sx={{ mt: 2 }}>
                        <TextField
                            label="Nom"
                            variant="outlined"
                            fullWidth
                            required
                            value={recommendation.name}
                            onChange={(e) => setRecommendation({ ...recommendation, name: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            value={recommendation.email}
                            onChange={(e) => setRecommendation({ ...recommendation, email: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Message"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={recommendation.message}
                            onChange={(e) => setRecommendation({ ...recommendation, message: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mb: 2 }}
                        >
                            Télécharger un fichier
                            <input
                                type="file"
                                hidden
                                onChange={(e) => setRecommendation({ ...recommendation, file: e.target.files[0] })}
                            />
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Envoyer
                        </Button>
                    </Box>
                    {filePath && (
                        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                            Fichier téléchargé avec succès. Chemin du fichier : {filePath}
                        </Typography>
                    )}
                </Box>
            </Container>
            <Footer /> {/* Utiliser le composant Footer */}
            <ToastContainer 
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Shop;