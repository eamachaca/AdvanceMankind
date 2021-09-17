import java.util.Arrays;
import java.util.Random;

public class NearbyNumbers {

    private static int[] nearbyNumbers(int[] givens) {//two integers number in array
        int[] result = new int[2];
        int closeness = Integer.MAX_VALUE;
        for (int i = 0; i < givens.length; i++) {
            for (int j = 0; j < givens.length; j++) {
                int abs = Math.abs(givens[i] - givens[j]);
                if (i != j && abs < closeness) {
                    closeness = abs;
                    result[0] = givens[i];
                    result[1] = givens[j];
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] given = {34, 5, 6, 45, 4, 1, 7, 35};//change it. I think
        /*int[] given = new int[10];
        for (int i = 0; i < 10; i++) {
            given[i] = (new Random()).nextInt(1000);
        }*/
        System.out.println(Arrays.toString(given));
        System.out.println(Arrays.toString(nearbyNumbers(given)));
    }
}