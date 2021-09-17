import junit.framework.TestCase;

public class AdvanceMankindTest extends TestCase {
    public void testHighest() {
        Item[] items = new Item[5];
        items[0] = new Item("1", 14.54156);
        items[1] = new Item("2", 23.54156);
        items[2] = new Item("3", 24.64156);
        items[3] = new Item("4", 38.45656);
        items[4] = new Item("5", 39.6);
        double result = HighestPrice.getHighest(items);
        assertEquals(39.6, result);
    }

    public void testNearby() {
        int[] items = {59, 685, 132, 46, 987, 321, 68, 61, 98};
        int[] result = NearbyNumbers.nearbyNumbers(items);
        assertEquals(59, result[0]);
        assertEquals(61, result[1]);
    }
}