import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tabela-anova',
  templateUrl: './tabela-anova.component.html',
  styleUrls: ['./tabela-anova.component.scss']
})
export class TabelaAnovaComponent implements OnInit {

  public tabelaAnova: any;
  public tabelaAnovaY: any;
  public medias: any;
  public variancas: any;
  public alfa: any;
  public alfaY: any;
  public indexEditar = null;
  public resultado: any
  public alfaPorcentagem: any;

  public historico: any
  public formInicial: FormGroup;
  public tratamentos: Array<[]> = [];
  public podeCalcular: boolean = false;
  public abrirModal: boolean = false


  public tabela10 = [[39.864, 49.500, 53.593, 55.833, 57.240, 58.204, 58.906, 59.439, 59.857, 60.195, 60.473, 60.705, 60.902, 61.073, 61.220, 61.740],
  [8.526, 9.000, 9.162, 9.243, 9.293, 9.326, 9.349, 9.367, 9.381, 9.392, 9.401, 9.408, 9.415, 9.420, 9.425, 9.441],
  [5.538, 5.462, 5.391, 5.343, 5.309, 5.285, 5.266, 5.252, 5.240, 5.230, 5.222, 5.216, 5.210, 5.205, 5.200, 5.184],
  [4.545, 4.325, 4.191, 4.107, 4.051, 4.010, 3.979, 3.955, 3.936, 3.920, 3.907, 3.896, 3.886, 3.878, 3.870, 3.844],
  [4.060, 3.780, 3.619, 3.520, 3.453, 3.405, 3.368, 3.339, 3.316, 3.297, 3.282, 3.268, 3.257, 3.247, 3.238, 3.207],
  [3.776, 3.463, 3.289, 3.181, 3.108, 3.055, 3.014, 2.983, 2.958, 2.937, 2.920, 2.905, 2.892, 2.881, 2.871, 2.836],
  [3.589, 3.257, 3.074, 2.961, 2.883, 2.827, 2.785, 2.752, 2.725, 2.703, 2.684, 2.668, 2.654, 2.643, 2.632, 2.595],
  [3.458, 3.113, 2.924, 2.806, 2.726, 2.668, 2.624, 2.589, 2.561, 2.538, 2.519, 2.502, 2.488, 2.475, 2.464, 2.425],
  [3.360, 3.006, 2.813, 2.693, 2.611, 2.551, 2.505, 2.469, 2.440, 2.416, 2.396, 2.379, 2.364, 2.351, 2.340, 2.298],
  [3.285, 2.924, 2.728, 2.605, 2.522, 2.461, 2.414, 2.377, 2.347, 2.323, 2.302, 2.284, 2.269, 2.255, 2.244, 2.201],
  [3.225, 2.860, 2.660, 2.536, 2.451, 2.389, 2.342, 2.304, 2.274, 2.248, 2.227, 2.209, 2.193, 2.179, 2.167, 2.123],
  [3.177, 2.807, 2.606, 2.480, 2.394, 2.331, 2.283, 2.245, 2.214, 2.188, 2.166, 2.147, 2.131, 2.117, 2.105, 2.060],
  [3.136, 2.763, 2.560, 2.434, 2.347, 2.283, 2.234, 2.195, 2.164, 2.138, 2.116, 2.097, 2.080, 2.066, 2.053, 2.007],
  [3.102, 2.726, 2.522, 2.395, 2.307, 2.243, 2.193, 2.154, 2.122, 2.095, 2.073, 2.054, 2.037, 2.022, 2.010, 1.962],
  [3.073, 2.695, 2.490, 2.361, 2.273, 2.208, 2.158, 2.119, 2.086, 2.059, 2.037, 2.017, 2.000, 1.985, 1.972, 1.924],
  [3.048, 2.668, 2.462, 2.333, 2.244, 2.178, 2.128, 2.088, 2.055, 2.028, 2.005, 1.985, 1.968, 1.953, 1.940, 1.891],
  [3.026, 2.645, 2.437, 2.308, 2.218, 2.152, 2.102, 2.061, 2.028, 2.001, 1.978, 1.958, 1.940, 1.925, 1.912, 1.862],
  [3.007, 2.624, 2.416, 2.286, 2.196, 2.130, 2.079, 2.038, 2.005, 1.977, 1.954, 1.933, 1.916, 1.900, 1.887, 1.837],
  [2.990, 2.606, 2.397, 2.266, 2.176, 2.109, 2.058, 2.017, 1.984, 1.956, 1.932, 1.912, 1.894, 1.878, 1.865, 1.814],
  [2.975, 2.589, 2.380, 2.249, 2.158, 2.091, 2.040, 1.999, 1.965, 1.937, 1.913, 1.892, 1.875, 1.859, 1.845, 1.794],
  [2.961, 2.575, 2.365, 2.233, 2.142, 2.075, 2.023, 1.982, 1.948, 1.920, 1.896, 1.875, 1.857, 1.841, 1.827, 1.776],
  [2.949, 2.561, 2.351, 2.219, 2.128, 2.060, 2.008, 1.967, 1.933, 1.904, 1.880, 1.859, 1.841, 1.825, 1.811, 1.759],
  [2.937, 2.549, 2.339, 2.207, 2.115, 2.047, 1.995, 1.953, 1.919, 1.890, 1.866, 1.845, 1.827, 1.811, 1.796, 1.744],
  [2.927, 2.538, 2.327, 2.195, 2.103, 2.035, 1.983, 1.941, 1.906, 1.877, 1.853, 1.832, 1.814, 1.797, 1.783, 1.730],
  [2.918, 2.528, 2.317, 2.184, 2.092, 2.024, 1.971, 1.929, 1.895, 1.866, 1.841, 1.820, 1.802, 1.785, 1.771, 1.718],
  [2.909, 2.519, 2.307, 2.174, 2.082, 2.014, 1.961, 1.919, 1.884, 1.855, 1.830, 1.809, 1.790, 1.774, 1.760, 1.706],
  [2.901, 2.511, 2.299, 2.165, 2.073, 2.005, 1.952, 1.909, 1.874, 1.845, 1.820, 1.799, 1.780, 1.764, 1.749, 1.695],
  [2.894, 2.503, 2.291, 2.157, 2.064, 1.996, 1.943, 1.900, 1.865, 1.836, 1.811, 1.790, 1.771, 1.754, 1.740, 1.685],
  [2.887, 2.495, 2.283, 2.149, 2.057, 1.988, 1.935, 1.892, 1.857, 1.827, 1.802, 1.781, 1.762, 1.745, 1.731, 1.676],
  [2.881, 2.489, 2.276, 2.142, 2.049, 1.980, 1.927, 1.884, 1.849, 1.819, 1.794, 1.773, 1.754, 1.737, 1.722, 1.667]]

  public tabela5 = [[161.4, 199.5, 215.7, 224.6, 230.2, 234.0, 236.8, 238.9, 240.5, 241.9, 243.0, 243.9, 244.7, 245.4, 245.9, 248.0],
  [18.513, 19.000, 19.164, 19.247, 19.296, 19.329, 19.353, 19.371, 19.385, 19.396, 19.405, 19.412, 19.419, 19.424, 19.429],
  [10.128, 9.552, 9.277, 9.117, 9.013, 8.941, 8.887, 8.845, 8.812, 8.785, 8.763, 8.745, 8.729, 8.715, 8.703, 8.660],
  [7.709, 6.944, 6.591, 6.388, 6.256, 6.163, 6.094, 6.041, 5.999, 5.964, 5.936, 5.912, 5.891, 5.873, 5.858, 5.803],
  [6.608, 5.786, 5.409, 5.192, 5.050, 4.950, 4.876, 4.818, 4.772, 4.735, 4.704, 4.678, 4.655, 4.636, 4.619, 4.558],
  [5.987, 5.143, 4.757, 4.534, 4.387, 4.284, 4.207, 4.147, 4.099, 4.060, 4.027, 4.000, 3.976, 3.956, 3.938, 3.874],
  [5.591, 4.737, 4.347, 4.120, 3.972, 3.866, 3.787, 3.726, 3.677, 3.637, 3.603, 3.575, 3.550, 3.529, 3.511, 3.445],
  [5.318, 4.459, 4.066, 3.838, 3.688, 3.581, 3.500, 3.438, 3.388, 3.347, 3.313, 3.284, 3.259, 3.237, 3.218, 3.150],
  [5.117, 4.256, 3.863, 3.633, 3.482, 3.374, 3.293, 3.230, 3.179, 3.137, 3.102, 3.073, 3.048, 3.025, 3.006, 2.936],
  [4.965, 4.103, 3.708, 3.478, 3.326, 3.217, 3.135, 3.072, 3.020, 2.978, 2.943, 2.913, 2.887, 2.865, 2.845, 2.774],
  [4.844, 3.982, 3.587, 3.357, 3.204, 3.095, 3.012, 2.948, 2.896, 2.854, 2.818, 2.788, 2.761, 2.739, 2.719, 2.646],
  [4.747, 3.885, 3.490, 3.259, 3.106, 2.996, 2.913, 2.849, 2.796, 2.753, 2.717, 2.687, 2.660, 2.637, 2.617, 2.544],
  [4.667, 3.806, 3.411, 3.179, 3.025, 2.915, 2.832, 2.767, 2.714, 2.671, 2.635, 2.604, 2.577, 2.554, 2.533, 2.459],
  [4.600, 3.739, 3.344, 3.112, 2.958, 2.848, 2.764, 2.699, 2.646, 2.602, 2.565, 2.534, 2.507, 2.484, 2.463, 2.388],
  [4.543, 3.682, 3.287, 3.056, 2.901, 2.790, 2.707, 2.641, 2.588, 2.544, 2.507, 2.475, 2.448, 2.424, 2.403, 2.328],
  [4.494, 3.634, 3.239, 3.007, 2.852, 2.741, 2.657, 2.591, 2.538, 2.494, 2.456, 2.425, 2.397, 2.373, 2.352, 2.276],
  [4.451, 3.592, 3.197, 2.965, 2.810, 2.699, 2.614, 2.548, 2.494, 2.450, 2.413, 2.381, 2.353, 2.329, 2.308, 2.230],
  [4.414, 3.555, 3.160, 2.928, 2.773, 2.661, 2.577, 2.510, 2.456, 2.412, 2.374, 2.342, 2.314, 2.290, 2.269, 2.191],
  [4.381, 3.522, 3.127, 2.895, 2.740, 2.628, 2.544, 2.477, 2.423, 2.378, 2.340, 2.308, 2.280, 2.256, 2.234, 2.155],
  [4.351, 3.493, 3.098, 2.866, 2.711, 2.599, 2.514, 2.447, 2.393, 2.348, 2.310, 2.278, 2.250, 2.225, 2.203, 2.124],
  [4.325, 3.467, 3.072, 2.840, 2.685, 2.573, 2.488, 2.420, 2.366, 2.321, 2.283, 2.250, 2.222, 2.197, 2.176, 2.096],
  [4.301, 3.443, 3.049, 2.817, 2.661, 2.549, 2.464, 2.397, 2.342, 2.297, 2.259, 2.226, 2.198, 2.173, 2.151, 2.071],
  [4.279, 3.422, 3.028, 2.796, 2.640, 2.528, 2.442, 2.375, 2.320, 2.275, 2.236, 2.204, 2.175, 2.150, 2.128, 2.048],
  [4.260, 3.403, 3.009, 2.776, 2.621, 2.508, 2.423, 2.355, 2.300, 2.255, 2.216, 2.183, 2.155, 2.130, 2.108, 2.027],
  [4.242, 3.385, 2.991, 2.759, 2.603, 2.490, 2.405, 2.337, 2.282, 2.236, 2.198, 2.165, 2.136, 2.111, 2.089, 2.007],
  [4.225, 3.369, 2.975, 2.743, 2.587, 2.474, 2.388, 2.321, 2.265, 2.220, 2.181, 2.148, 2.119, 2.094, 2.072, 1.990],
  [4.210, 3.354, 2.960, 2.728, 2.572, 2.459, 2.373, 2.305, 2.250, 2.204, 2.166, 2.132, 2.103, 2.078, 2.056, 1.974],
  [4.196, 3.340, 2.947, 2.714, 2.558, 2.445, 2.359, 2.291, 2.236, 2.190, 2.151, 2.118, 2.089, 2.064, 2.041, 1.959],
  [4.183, 3.328, 2.934, 2.701, 2.545, 2.432, 2.346, 2.278, 2.223, 2.177, 2.138, 2.104, 2.075, 2.050, 2.027, 1.945],
  [4.171, 3.316, 2.922, 2.690, 2.534, 2.421, 2.334, 2.266, 2.211, 2.165, 2.126, 2.092, 2.063, 2.037, 2.015, 1.932]]

  public tabela2_5 = [[647.8, 799.5, 864.2, 899.6, 921.8, 937.1, 948.2, 956.6, 963.3, 968.6, 973.0, 976.7, 979.8, 982.5, 984.9, 993.1],
  [38.506, 39.000, 39.166, 39.248, 39.298, 39.331, 39.356, 39.373, 39.387, 39.398, 39.407, 39.415, 39.421, 39.427, 39.431, 39.448],
  [17.443, 16.044, 15.439, 15.101, 14.885, 14.735, 14.624, 14.540, 14.473, 14.419, 14.374, 14.337, 14.305, 14.277, 14.253, 14.167],
  [12.218, 10.649, 9.979, 9.604, 9.364, 9.197, 9.074, 8.980, 8.905, 8.844, 8.794, 8.751, 8.715, 8.684, 8.657, 8.560],
  [10.007, 8.434, 7.764, 7.388, 7.146, 6.978, 6.853, 6.757, 6.681, 6.619, 6.568, 6.525, 6.488, 6.456, 6.428, 6.329],
  [8.813, 7.260, 6.599, 6.227, 5.988, 5.820, 5.695, 5.600, 5.523, 5.461, 5.410, 5.366, 5.329, 5.297, 5.269, 5.168],
  [8.073, 6.542, 5.890, 5.523, 5.285, 5.119, 4.995, 4.899, 4.823, 4.761, 4.709, 4.666, 4.628, 4.596, 4.568, 4.467],
  [7.571, 6.059, 5.416, 5.053, 4.817, 4.652, 4.529, 4.433, 4.357, 4.295, 4.243, 4.200, 4.162, 4.130, 4.101, 3.999],
  [7.209, 5.715, 5.078, 4.718, 4.484, 4.320, 4.197, 4.102, 4.026, 3.964, 3.912, 3.868, 3.831, 3.798, 3.769, 3.667],
  [6.937, 5.456, 4.826, 4.468, 4.236, 4.072, 3.950, 3.855, 3.779, 3.717, 3.665, 3.621, 3.583, 3.550, 3.522, 3.419],
  [6.724, 5.256, 4.630, 4.275, 4.044, 3.881, 3.759, 3.664, 3.588, 3.526, 3.474, 3.430, 3.392, 3.359, 3.330, 3.226],
  [6.554, 5.096, 4.474, 4.121, 3.891, 3.728, 3.607, 3.512, 3.436, 3.374, 3.321, 3.277, 3.239, 3.206, 3.177, 3.073],
  [6.414, 4.965, 4.347, 3.996, 3.767, 3.604, 3.483, 3.388, 3.312, 3.250, 3.197, 3.153, 3.115, 3.082, 3.053, 2.948],
  [6.298, 4.857, 4.242, 3.892, 3.663, 3.501, 3.380, 3.285, 3.209, 3.147, 3.095, 3.050, 3.012, 2.979, 2.949, 2.844],
  [6.200, 4.765, 4.153, 3.804, 3.576, 3.415, 3.293, 3.199, 3.123, 3.060, 3.008, 2.963, 2.925, 2.891, 2.862, 2.756],
  [6.115, 4.687, 4.077, 3.729, 3.502, 3.341, 3.219, 3.125, 3.049, 2.986, 2.934, 2.889, 2.851, 2.817, 2.788, 2.681],
  [6.042, 4.619, 4.011, 3.665, 3.438, 3.277, 3.156, 3.061, 2.985, 2.922, 2.870, 2.825, 2.786, 2.753, 2.723, 2.616],
  [5.978, 4.560, 3.954, 3.608, 3.382, 3.221, 3.100, 3.005, 2.929, 2.866, 2.814, 2.769, 2.730, 2.696, 2.667, 2.559],
  [5.922, 4.508, 3.903, 3.559, 3.333, 3.172, 3.051, 2.956, 2.880, 2.817, 2.765, 2.720, 2.681, 2.647, 2.617, 2.509],
  [5.871, 4.461, 3.859, 3.515, 3.289, 3.128, 3.007, 2.913, 2.837, 2.774, 2.721, 2.676, 2.637, 2.603, 2.573, 2.464],
  [5.827, 4.420, 3.819, 3.475, 3.250, 3.090, 2.969, 2.874, 2.798, 2.735, 2.682, 2.637, 2.598, 2.564, 2.534, 2.425],
  [5.786, 4.383, 3.783, 3.440, 3.215, 3.055, 2.934, 2.839, 2.763, 2.700, 2.647, 2.602, 2.563, 2.528, 2.498, 2.389],
  [5.750, 4.349, 3.750, 3.408, 3.183, 3.023, 2.902, 2.808, 2.731, 2.668, 2.615, 2.570, 2.531, 2.497, 2.466, 2.357],
  [5.717, 4.319, 3.721, 3.379, 3.155, 2.995, 2.874, 2.779, 2.703, 2.640, 2.586, 2.541, 2.502, 2.468, 2.437, 2.327],
  [5.686, 4.291, 3.694, 3.353, 3.129, 2.969, 2.848, 2.753, 2.677, 2.613, 2.560, 2.515, 2.476, 2.441, 2.411, 2.300],
  [5.659, 4.265, 3.670, 3.329, 3.105, 2.945, 2.824, 2.729, 2.653, 2.590, 2.536, 2.491, 2.452, 2.417, 2.387, 2.276],
  [5.633, 4.242, 3.647, 3.307, 3.083, 2.923, 2.802, 2.707, 2.631, 2.568, 2.514, 2.469, 2.429, 2.395, 2.364, 2.253],
  [5.610, 4.221, 3.626, 3.286, 3.063, 2.903, 2.782, 2.687, 2.611, 2.547, 2.494, 2.448, 2.409, 2.374, 2.344, 2.232],
  [5.588, 4.201, 3.607, 3.267, 3.044, 2.884, 2.763, 2.669, 2.592, 2.529, 2.475, 2.430, 2.390, 2.355, 2.325, 2.213],
  [5.568, 4.182, 3.589, 3.250, 3.026, 2.867, 2.746, 2.651, 2.575, 2.511, 2.458, 2.412, 2.372, 2.338, 2.307, 2.195]]

  public tabela1 = [[4052.2, 4999.3, 5403.5, 5624.3, 5764.0, 5859.0, 5928.3, 5981.0, 6022.4, 6055.9, 6083.4, 6106.7, 6125.8, 6143.0, 6157.0, 6208.7],
  [98.502, 99.000, 99.164, 99.251, 99.302, 99.331, 99.357, 99.375, 99.390, 99.397, 99.408, 99.419, 99.422, 99.426, 99.433, 99.448],
  [34.116, 30.816, 29.457, 28.710, 28.237, 27.911, 27.671, 27.489, 27.345, 27.228, 27.132, 27.052, 26.983, 26.924, 26.872, 26.690],
  [21.198, 18.000, 16.694, 15.977, 15.522, 15.207, 14.976, 14.799, 14.659, 14.546, 14.452, 14.374, 14.306, 14.249, 14.198, 14.019],
  [16.258, 13.274, 12.060, 11.392, 10.967, 10.672, 10.456, 10.289, 10.158, 10.051, 9.963, 9.888, 9.825, 9.770, 9.722, 9.553],
  [13.745, 10.925, 9.780, 9.148, 8.746, 8.466, 8.260, 8.102, 7.976, 7.874, 7.790, 7.718, 7.657, 7.605, 7.559, 7.396],
  [12.246, 9.547, 8.451, 7.847, 7.460, 7.191, 6.993, 6.840, 6.719, 6.620, 6.538, 6.469, 6.410, 6.359, 6.314, 6.155],
  [11.259, 8.649, 7.591, 7.006, 6.632, 6.371, 6.178, 6.029, 5.911, 5.814, 5.734, 5.667, 5.609, 5.559, 5.515, 5.359],
  [10.562, 8.022, 6.992, 6.422, 6.057, 5.802, 5.613, 5.467, 5.351, 5.257, 5.178, 5.111, 5.055, 5.005, 4.962, 4.808],
  [10.044, 7.559, 6.552, 5.994, 5.636, 5.386, 5.200, 5.057, 4.942, 4.849, 4.772, 4.706, 4.650, 4.601, 4.558, 4.405],
  [9.646, 7.206, 6.217, 5.668, 5.316, 5.069, 4.886, 4.744, 4.632, 4.539, 4.462, 4.397, 4.342, 4.293, 4.251, 4.099],
  [9.330, 6.927, 5.953, 5.412, 5.064, 4.821, 4.640, 4.499, 4.388, 4.296, 4.220, 4.155, 4.100, 4.052, 4.010, 3.858],
  [9.074, 6.701, 5.739, 5.205, 4.862, 4.620, 4.441, 4.302, 4.191, 4.100, 4.025, 3.960, 3.905, 3.857, 3.815, 3.665],
  [8.862, 6.515, 5.564, 5.035, 4.695, 4.456, 4.278, 4.140, 4.030, 3.939, 3.864, 3.800, 3.745, 3.698, 3.656, 3.505],
  [8.683, 6.359, 5.417, 4.893, 4.556, 4.318, 4.142, 4.004, 3.895, 3.805, 3.730, 3.666, 3.612, 3.564, 3.522, 3.372],
  [8.531, 6.226, 5.292, 4.773, 4.437, 4.202, 4.026, 3.890, 3.780, 3.691, 3.616, 3.553, 3.498, 3.451, 3.409, 3.259],
  [8.400, 6.112, 5.185, 4.669, 4.336, 4.101, 3.927, 3.791, 3.682, 3.593, 3.518, 3.455, 3.401, 3.353, 3.312, 3.162],
  [8.285, 6.013, 5.092, 4.579, 4.248, 4.015, 3.841, 3.705, 3.597, 3.508, 3.434, 3.371, 3.316, 3.269, 3.227, 3.077],
  [8.185, 5.926, 5.010, 4.500, 4.171, 3.939, 3.765, 3.631, 3.523, 3.434, 3.360, 3.297, 3.242, 3.195, 3.153, 3.003],
  [8.096, 5.849, 4.938, 4.431, 4.103, 3.871, 3.699, 3.564, 3.457, 3.368, 3.294, 3.231, 3.177, 3.130, 3.088, 2.938],
  [8.017, 5.780, 4.874, 4.369, 4.042, 3.812, 3.640, 3.506, 3.398, 3.310, 3.236, 3.173, 3.119, 3.072, 3.030, 2.880],
  [7.945, 5.719, 4.817, 4.313, 3.988, 3.758, 3.587, 3.453, 3.346, 3.258, 3.184, 3.121, 3.067, 3.019, 2.978, 2.827],
  [7.881, 5.664, 4.765, 4.264, 3.939, 3.710, 3.539, 3.406, 3.299, 3.211, 3.137, 3.074, 3.020, 2.973, 2.931, 2.780],
  [7.823, 5.614, 4.718, 4.218, 3.895, 3.667, 3.496, 3.363, 3.256, 3.168, 3.094, 3.032, 2.977, 2.930, 2.889, 2.738],
  [7.770, 5.568, 4.675, 4.177, 3.855, 3.627, 3.457, 3.324, 3.217, 3.129, 3.056, 2.993, 2.939, 2.892, 2.850, 2.699],
  [7.721, 5.526, 4.637, 4.140, 3.818, 3.591, 3.421, 3.288, 3.182, 3.094, 3.021, 2.958, 2.904, 2.857, 2.815, 2.664],
  [7.677, 5.488, 4.601, 4.106, 3.785, 3.558, 3.388, 3.256, 3.149, 3.062, 2.988, 2.926, 2.872, 2.824, 2.783, 2.632],
  [7.636, 5.453, 4.568, 4.074, 3.754, 3.528, 3.358, 3.226, 3.120, 3.032, 2.959, 2.896, 2.842, 2.795, 2.753, 2.602],
  [7.598, 5.420, 4.538, 4.045, 3.725, 3.499, 3.330, 3.198, 3.092, 3.005, 2.931, 2.868, 2.814, 2.767, 2.726, 2.574],
  [7.562, 5.390, 4.510, 4.018, 3.699, 3.473, 3.305, 3.173, 3.067, 2.979, 2.906, 2.843, 2.789, 2.742, 2.700, 2.549]]

  public tabela0_5 = [[16212, 19997, 21614, 22501, 23056, 23440, 23715, 23924, 24091, 24222, 24334, 24427, 24505, 24572, 24632, 24837],
  [198.5, 199.0, 199.2, 199.2, 199.3, 199.3, 199.4, 199.4, 199.4, 199.4, 199.4, 199.4, 199.4, 199.4, 199.4, 199.4],
  [55.552, 49.800, 47.468, 46.195, 45.391, 44.838, 44.434, 44.125, 43.881, 43.685, 43.525, 43.387, 43.270, 43.172, 43.085, 42.779],
  [31.332, 26.284, 24.260, 23.154, 22.456, 21.975, 21.622, 21.352, 21.138, 20.967, 20.824, 20.705, 20.603, 20.515, 20.438, 20.167],
  [22.785, 18.314, 16.530, 15.556, 14.939, 14.513, 14.200, 13.961, 13.772, 13.618, 13.491, 13.385, 13.293, 13.215, 13.146, 12.903],
  [18.635, 14.544, 12.917, 12.028, 11.464, 11.073, 10.786, 10.566, 10.391, 10.250, 10.133, 10.034, 9.950, 9.878, 9.814, 9.589],
  [16.235, 12.404, 10.883, 10.050, 9.522, 9.155, 8.885, 8.678, 8.514, 8.380, 8.270, 8.176, 8.097, 8.028, 7.968, 7.754],
  [14.688, 11.043, 9.597, 8.805, 8.302, 7.952, 7.694, 7.496, 7.339, 7.211, 7.105, 7.015, 6.938, 6.872, 6.814, 6.608],
  [13.614, 10.107, 8.717, 7.956, 7.471, 7.134, 6.885, 6.693, 6.541, 6.417, 6.314, 6.227, 6.153, 6.089, 6.032, 5.832],
  [12.827, 9.427, 8.081, 7.343, 6.872, 6.545, 6.303, 6.116, 5.968, 5.847, 5.746, 5.661, 5.589, 5.526, 5.471, 5.274],
  [12.226, 8.912, 7.600, 6.881, 6.422, 6.102, 5.865, 5.682, 5.537, 5.418, 5.320, 5.236, 5.165, 5.103, 5.049, 4.855],
  [11.754, 8.510, 7.226, 6.521, 6.071, 5.757, 5.524, 5.345, 5.202, 5.085, 4.988, 4.906, 4.836, 4.775, 4.721, 4.530],
  [11.374, 8.186, 6.926, 6.233, 5.791, 5.482, 5.253, 5.076, 4.935, 4.820, 4.724, 4.643, 4.573, 4.513, 4.460, 4.270],
  [11.060, 7.922, 6.680, 5.998, 5.562, 5.257, 5.031, 4.857, 4.717, 4.603, 4.508, 4.428, 4.359, 4.299, 4.247, 4.059],
  [10.798, 7.701, 6.476, 5.803, 5.372, 5.071, 4.847, 4.674, 4.536, 4.424, 4.329, 4.250, 4.181, 4.122, 4.070, 3.883],
  [10.576, 7.514, 6.303, 5.638, 5.212, 4.913, 4.692, 4.521, 4.384, 4.272, 4.179, 4.099, 4.031, 3.972, 3.920, 3.734],
  [10.384, 7.354, 6.156, 5.497, 5.075, 4.779, 4.559, 4.389, 4.254, 4.142, 4.050, 3.971, 3.903, 3.844, 3.793, 3.607],
  [10.218, 7.215, 6.028, 5.375, 4.956, 4.663, 4.445, 4.276, 4.141, 4.030, 3.938, 3.860, 3.793, 3.734, 3.683, 3.498],
  [10.073, 7.093, 5.916, 5.268, 4.853, 4.561, 4.345, 4.177, 4.043, 3.933, 3.841, 3.763, 3.696, 3.638, 3.587, 3.402],
  [9.944, 6.987, 5.818, 5.174, 4.762, 4.472, 4.257, 4.090, 3.956, 3.847, 3.756, 3.678, 3.611, 3.553, 3.502, 3.318],
  [9.829, 6.891, 5.730, 5.091, 4.681, 4.393, 4.179, 4.013, 3.880, 3.771, 3.680, 3.602, 3.536, 3.478, 3.427, 3.243],
  [9.727, 6.806, 5.652, 5.017, 4.609, 4.322, 4.109, 3.944, 3.812, 3.703, 3.612, 3.535, 3.469, 3.411, 3.360, 3.176],
  [9.635, 6.730, 5.582, 4.950, 4.544, 4.259, 4.047, 3.882, 3.750, 3.642, 3.551, 3.474, 3.408, 3.351, 3.300, 3.116],
  [9.551, 6.661, 5.519, 4.890, 4.486, 4.202, 3.991, 3.826, 3.695, 3.587, 3.497, 3.420, 3.354, 3.296, 3.246, 3.062],
  [9.475, 6.598, 5.462, 4.835, 4.433, 4.150, 3.939, 3.776, 3.645, 3.537, 3.447, 3.370, 3.304, 3.247, 3.196, 3.013],
  [9.406, 6.541, 5.409, 4.785, 4.384, 4.103, 3.893, 3.730, 3.599, 3.492, 3.402, 3.325, 3.259, 3.202, 3.151, 2.968],
  [9.342, 6.489, 5.361, 4.740, 4.340, 4.059, 3.850, 3.687, 3.557, 3.450, 3.360, 3.284, 3.218, 3.161, 3.110, 2.927],
  [9.284, 6.440, 5.317, 4.698, 4.300, 4.020, 3.811, 3.649, 3.519, 3.412, 3.322, 3.246, 3.180, 3.123, 3.073, 2.890],
  [9.230, 6.396, 5.276, 4.659, 4.262, 3.983, 3.775, 3.613, 3.483, 3.376, 3.287, 3.211, 3.145, 3.088, 3.038, 2.855],
  [9.180, 6.355, 5.239, 4.623, 4.228, 3.949, 3.742, 3.580, 3.451, 3.344, 3.255, 3.179, 3.113, 3.056, 3.006, 2.823],]




  constructor(private fb: FormBuilder) {

  }

  abrirHistorico() {
    if (!this.abrirModal) {
      this.abrirModal = true;
    } else {
      this.abrirModal = false;
    }
  }


  ngOnInit() {
    this.criaFormInicial();
    this.historico = JSON.parse(localStorage.getItem('historico'))
  }

  adicionarHistorico() {

    if (!this.historico) {
      this.historico = [this.tratamentos]
    } else {
      if (this.historico.length > 4) {
        this.historico.splice(0)
      }
      this.historico.push(this.tratamentos);
    }
    localStorage.setItem('historico', JSON.stringify(this.historico));
  }

  recuperahistorico(index) {
    this.tratamentos = this.historico[index]
    this.tratamentos.length > 1 ? this.podeCalcular = true : this.podeCalcular = false;

  }


  criaFormInicial() {
    this.formInicial = this.fb.group({
      quantidadeTratamento: new FormControl(''),
      tipoAnova: new FormControl('Experimentos'),
      alfa: new FormControl('5'),
    });
  }

  selecionarAlfa(x: any, y: any) {
    this.alfaPorcentagem = this.formInicial.controls.alfa.value
    switch (this.alfaPorcentagem) {
      case '5':
        return this.tabela5[y - 1][x - 1]
      case '10':
        return this.tabela10[y - 1][x - 1]
      case '2.5':
        return this.tabela2_5[y - 1][x - 1]
      case '1.0':
        return this.tabela10[y - 1][x - 1]
      case '0.5':
        return this.tabela0_5[y - 1][x - 1]
      default:
        break;
    }
  }

  adicionarTratamentos() {
 
    if (this.tratamentos.length == 0) {
      console.log([this.formInicial.controls.quantidadeTratamento.value.split(" ")])

      this.tratamentos = [this.formInicial.controls.quantidadeTratamento.value.split(" ")]
    } else {
      console.log('veio  2')
      this.tratamentos.push(this.formInicial.controls.quantidadeTratamento.value.split(" "));
    }
    console.log('veio  3')
    this.tratamentos.length > 1 ? this.podeCalcular = true : this.podeCalcular = false;
    this.formInicial.controls.quantidadeTratamento.reset()

    if (this.indexEditar !== null) {
      this.tratamentos.splice(this.indexEditar, 1)
      this.indexEditar = null;
    }
    console.log(this.tratamentos)

  }

  editarTratamento(index: number) {
    this.indexEditar = index;
    let seta = this.tratamentos[index].toString();
    this.formInicial.controls.quantidadeTratamento.setValue(seta.replace(/\,/g, ' '));


  }

  inverteArray() {
    var col = 0
    var column = [];
    var arrayY = []
    for (var a = 0; a < this.tratamentos[0].length; a++) {
      for (var i = 0; i < this.tratamentos.length; i++) {
        column.push(this.tratamentos[i][a]);
      }
      arrayY.push(column);
      column = [];
    }

    return arrayY;
  }

  calcular() {
    this.adicionarHistorico();
    let retorno = this.tabela(this.tratamentos);
    this.resultado = retorno
    this.medias = retorno.medias
    this.variancas = retorno.variancas
    this.tabelaAnova = retorno.table
    this.tabelaAnovaY = retorno.tableY

  }

  apagarTratamento(index: number) {
    this.tratamentos.splice(index, 1)

  }


  reiniciar(oque: any) {

    swal.fire({
      title: 'Reiniciar ?',
      text: 'Tu quer mesmo apagar esses calculos!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, reiniciar!',
      cancelButtonText: 'Não, ainda quero.'
    }).then((result) => {
      if (result.value) {
        this.tratamentos = [];

        this.tabelaAnova = '';
        this.tabelaAnovaY = '';
        this.medias = '';
      }
    })




  }

  //funçõs estatisticas
  num(elem) {
    var f = parseFloat(elem);
    if (f) return f;
    return 0;
  };

  sum(arr) {
    if (arr.length == 0) return null;
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      total += this.num(arr[i]);
    }
    return total;
  };

  smMean(arr) {
    if (arr.length == 0) return null;
    let mu;
    return mu = this.sum(arr) / arr.length;
  };

  mean(amostra) {
    var total = 0, count = 0;
    amostra.forEach(sample => {
      total += this.sum(sample);
      count += sample.length;
      this.sum(sample);
    });
    return total / count;
  }

  somaDosQuadrados(amostra) {
    var entreTratamento = 0, dentroTratamento = 0, fullMean = this.mean(amostra);
    amostra.forEach(sample => {
      var mu = this.smMean(sample);
      sample.forEach(val => {
        dentroTratamento += (val - mu) * (val - mu);
      });
      entreTratamento += (mu - fullMean) * (mu - fullMean) * sample.length;
    });

    return {
      total: entreTratamento + dentroTratamento,
      entreTratamento: entreTratamento,
      dentroTratamento: dentroTratamento,
    };
  };

  varianca(amostra) {
    var varianca = 0;
    for (var i = 0; i < amostra.length; i++) {
      varianca += (this.smMean(amostra) - amostra[i]) * (this.smMean(amostra) - amostra[i]);
    }
    varianca = varianca / (amostra.length - 1);
    return varianca
  }

  calculavarinca(amostra) {
    let variancaArray = [];
    amostra.forEach(sample => {
      variancaArray.push(this.varianca(sample));

    });
    return variancaArray;
  }

  media(amostra) {
    let mediaArray = [];
    amostra.forEach(sample => {
      mediaArray.push(this.smMean(sample));

    });
    return mediaArray

  }

  // Calcula o grau de liberdade
  grauDeLiberdade(amostra) {
    var total = 0;
    amostra.forEach(sample => {
      total += sample.length;
    });

    var entreTratamento = amostra.length - 1;
    var dentroTratamento = total - amostra.length;

    return {
      total: entreTratamento + dentroTratamento,
      entreTratamento: entreTratamento,
      dentroTratamento: dentroTratamento
    };
  };


  // calcula quadrado da media
  quadradoDaMedia = function (amostra, verbose?) {
    var somadosquadrados = this.somaDosQuadrados(amostra);
    var graudeliberdade = this.grauDeLiberdade(amostra);

    var results = {
      entreTratamento: somadosquadrados.entreTratamento / graudeliberdade.entreTratamento,
      dentroTratamento: somadosquadrados.dentroTratamento / graudeliberdade.dentroTratamento,
      somadosquadrados,
      graudeliberdade
    };

    if (verbose) {
      results.somadosquadrados = somadosquadrados;
      results.graudeliberdade = graudeliberdade;
    }


    return results;
  };


  // Calcula o F - Razao
  razao(amostra) {
    var quadradodamedia = this.quadradoDaMedia(amostra);
    return quadradodamedia.entreTratamento / quadradodamedia.dentroTratamento;
  };

  tabela(amostra) {
    var quadradodamedia = this.quadradoDaMedia(amostra, true);
    var medias = this.media(amostra)
    var variancas = this.calculavarinca(amostra);
    let tabela

    if (this.formInicial.controls.tipoAnova.value == "Experimentos") {
      tabela = {
        table: {
          entreTratamento: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.entreTratamento,
            grauDeLiberdade: quadradodamedia.graudeliberdade.entreTratamento,
            quadradoDaMedia: quadradodamedia.entreTratamento,
            F: quadradodamedia.entreTratamento / quadradodamedia.dentroTratamento
          },
          dentroTratamento: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.dentroTratamento,
            grauDeLiberdade: quadradodamedia.graudeliberdade.dentroTratamento,
            quadradoDaMedia: quadradodamedia.dentroTratamento
          },
          total: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.total,
            grauDeLiberdade: quadradodamedia.graudeliberdade.total
          }
        },
        medias,
        variancas
      };
      this.alfa = this.selecionarAlfa(tabela.table.entreTratamento.grauDeLiberdade, tabela.table.dentroTratamento.grauDeLiberdade);
    } else {
      let arrayY = this.inverteArray();
      var quadradodamediaY = this.quadradoDaMedia(arrayY, true);
      var mediasY = this.media(arrayY)
      var variancasY = this.calculavarinca(arrayY);
      var SQRBlocos = quadradodamedia.somadosquadrados.total - quadradodamediaY.somadosquadrados.entreTratamento - quadradodamedia.somadosquadrados.entreTratamento

      /* 
      Lembrar de trocar o nome da caoluna da coluna 'causa de varianção'
      */

      tabela = {
        table: {
          entreTratamento: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.entreTratamento,
            grauDeLiberdade: quadradodamedia.graudeliberdade.entreTratamento,
            quadradoDaMedia: quadradodamedia.entreTratamento,
            F: quadradodamedia.entreTratamento / (SQRBlocos / (quadradodamedia.graudeliberdade.entreTratamento * quadradodamediaY.graudeliberdade.entreTratamento))
          },//dentro é residuo
          dentroTratamento: {
            somaDosQuadrados: SQRBlocos,
            grauDeLiberdade: quadradodamedia.graudeliberdade.entreTratamento * quadradodamediaY.graudeliberdade.entreTratamento,
            quadradoDaMedia: SQRBlocos / (quadradodamedia.graudeliberdade.entreTratamento * quadradodamediaY.graudeliberdade.entreTratamento)
          },
          total: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.total,
            grauDeLiberdade: quadradodamedia.graudeliberdade.total
          }
        },
        tableY: {
          entreTratamento: {
            somaDosQuadrados: quadradodamediaY.somadosquadrados.entreTratamento,
            grauDeLiberdade: quadradodamediaY.graudeliberdade.entreTratamento,
            quadradoDaMedia: quadradodamediaY.entreTratamento,
            // F: quadradodamediaY.entreTratamento / quadradodamediaY.dentroTratamento
            F: quadradodamediaY.entreTratamento / (SQRBlocos / (quadradodamedia.graudeliberdade.entreTratamento * quadradodamediaY.graudeliberdade.entreTratamento))

          },
          dentroTratamento: {
            somaDosQuadrados: quadradodamediaY.somadosquadrados.dentroTratamento,
            grauDeLiberdade: quadradodamediaY.graudeliberdade.dentroTratamento,
            quadradoDaMedia: quadradodamediaY.dentroTratamento
          },
          total: {
            somaDosQuadrados: quadradodamediaY.somadosquadrados.total,
            grauDeLiberdade: quadradodamediaY.graudeliberdade.total
          }
        },
        mediasY,
        variancasY,
        medias,
        variancas
      };

      this.alfaY = this.selecionarAlfa(tabela.tableY.entreTratamento.grauDeLiberdade, tabela.table.dentroTratamento.grauDeLiberdade);
      this.alfa = this.selecionarAlfa(tabela.table.entreTratamento.grauDeLiberdade, tabela.table.dentroTratamento.grauDeLiberdade);

    }
    return tabela

  }

}
