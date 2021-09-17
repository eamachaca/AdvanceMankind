import java.util.Arrays;
import java.util.Random;

class Item {
    private String sku;
    private Double price;

    public Item(String sku, Double price) {
        this.sku = sku;
        this.price = price;
    }

    public String getSku() {
        return sku;
    }

    public Double getPrice() {
        return price;
    }

    public String toString() {
        return getSku() + " - " + getPrice() + " $";
    }
}

interface Highest {
    public Item highest(Item[] items);
}

public class HighestPrice {

    public static void main(String[] args) {

        Item[] givens = new Item[15];
        Random random = new Random();
        for (int i = 0; i < 15; i++) {
            givens[i] = new Item("" + i, random.nextDouble());
        }
        System.out.println(Arrays.toString(givens));
        Highest highest = (a) -> {
            double max = Double.MIN_VALUE;
            Item aux = null;
            for (Item b : a) {
                double price = b.getPrice();
                if (price > max) {
                    aux = b;
                    max = price;
                }
            }
            return aux;
        };
        System.out.println(highest.highest(givens));

    }
}
