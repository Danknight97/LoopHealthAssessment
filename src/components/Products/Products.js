import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Toolbar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { motion } from 'framer-motion';



export default function Products() {

    const itemVariant = {
        hidden: {
            x: '-20vw',

        },
        visible: {
            x: 0,

            transition: {
                delay: 0.1, duration: 2, type: 'spring'
            }
        }
    }

    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 500,
          width:345,
        },
        searchContainer: {
            display: "flex",
            //backgroundColor: fade(theme.palette.common.white, 0.15),
            paddingLeft: "20px",
            paddingRight: "20px",
            marginTop: "5px",
            marginBottom: "5px",
            marginLeft: "1500px",
          },
          searchIcon: {
            alignSelf: "flex-end",
            marginBottom: "5px",
          },
          searchInput: {
            width: "200px",
            margin: "5px",
          },
      });

      const classes = useStyles();

const [searchedProducts,setSearchedProducts] = useState([]);
const [products,setProducts] = useState([]);
const [search,setSearch] = useState("");



useEffect(() => {
    axios.get('https://demo7242716.mockable.io/products')
    .then(res => {
        setProducts(res.data.products);
        setSearchedProducts(res.data.products);
    })
    .catch(err => {
        console.log(err);
    })
},[])


    const handleSearchChange = (e) => {
        let filteredProducts = [];
        let allProducts = products;
        allProducts.forEach(product => {
        //filter query
        if(product.brand.toLowerCase().includes(search.toLowerCase()))
            filteredProducts.push(product);
        
    });
        setSearchedProducts(filteredProducts);
    setSearch(e.target.value);
    }

    return (
        <main>
            <Toolbar>
        <div className={classes.searchContainer}>
           <SearchIcon className={classes.SearchIcon} /> 
           <TextField 
           onChange={handleSearchChange}
           className={classes.searchInput}
           label="Search for Products"
           variant="standard" />
        </div>

        
            </Toolbar>
        <motion.div className="main-content"
        variants={itemVariant}
        initial='hidden'
        animate="visible">
            <Grid container justifyContent="center" spacing={4}>
                {
                 searchedProducts.map(product => <Grid item key={product.productId} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={product.images[0].src}
                    title={product.productName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight={500}>
                        {product.brand}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {product.productName}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p" >
                        Price:{product.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        MRP:{product.mrp}
                        </Typography>
                        <Typography variant="body2" color="primary" component="p">
                        {product.discountDisplayLabel}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
                    </Grid>)
                    }
            </Grid>
            </motion.div>
        </main>
    )
}
