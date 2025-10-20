import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    Smile,
    CheckCircle,
    XCircle,
    HelpCircle,
    Download,
} from 'lucide-react'
import { useState, useEffect } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';
import * as XLSX from 'xlsx';

// Local storage utility functions
const saveWishesToLocalStorage = (wishes) => {
    try {
        localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    } catch (error) {
        console.error('Error saving wishes to localStorage:', error);
    }
};

const loadWishesFromLocalStorage = () => {
    try {
        const savedWishes = localStorage.getItem('wedding_wishes');
        return savedWishes ? JSON.parse(savedWishes) : [];
    } catch (error) {
        console.error('Error loading wishes from localStorage:', error);
        return [];
    }
};

export default function Wishes() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [newWish, setNewWish] = useState('');
    const [guestName, setGuestName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 'ATTENDING', label: 'Ya, saya akan hadir' },
        { value: 'NOT_ATTENDING', label: 'Tidak, saya tidak bisa hadir' },
        { value: 'MAYBE', label: 'Mungkin, saya akan konfirmasi nanti' }
    ];
    // Load wishes from localStorage or use default examples
    const [wishes, setWishes] = useState([]);

    // Load wishes from localStorage on component mount
    useEffect(() => {
        const savedWishes = loadWishesFromLocalStorage();
        
        // Filter out dummy data (John Doe, Natalie, Abdur Rofi)
        const filteredWishes = savedWishes.filter(wish => 
            !['John Doe', 'Natalie', 'Abdur Rofi'].includes(wish.name)
        );
        
        // If we filtered out dummy data, save the cleaned version
        if (filteredWishes.length !== savedWishes.length) {
            saveWishesToLocalStorage(filteredWishes);
        }
        
        setWishes(filteredWishes);
    }, []);

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.trim() || !guestName.trim()) return;

        setIsSubmitting(true);
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newWishObj = {
            id: Date.now(), // Use timestamp for unique ID
            name: guestName.trim(),
            message: newWish.trim(),
            attending: attendance || "attending",
            timestamp: new Date().toISOString()
        };

        const updatedWishes = [newWishObj, ...wishes];
        setWishes(updatedWishes);
        
        // Save to localStorage
        saveWishesToLocalStorage(updatedWishes);
        
        // Reset form
        setNewWish('');
        setGuestName('');
        setAttendance('');
        setIsSubmitting(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };
    const getAttendanceIcon = (status) => {
        switch (status) {
            case 'attending':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'not-attending':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'maybe':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };

    const clearAllWishes = () => {
        if (confirm('Apakah Anda yakin ingin menghapus semua ucapan?')) {
            localStorage.removeItem('wedding_wishes');
            setWishes([]);
        }
    };

    const clearDummyData = () => {
        const savedWishes = loadWishesFromLocalStorage();
        const filteredWishes = savedWishes.filter(wish => 
            !['John Doe', 'Natalie', 'Abdur Rofi'].includes(wish.name)
        );
        
        if (filteredWishes.length !== savedWishes.length) {
            saveWishesToLocalStorage(filteredWishes);
            setWishes(filteredWishes);
            alert('Data dummy telah dihapus!');
        } else {
            alert('Tidak ada data dummy yang ditemukan.');
        }
    };

    const exportToExcel = () => {
        if (wishes.length === 0) {
            alert('Tidak ada data untuk diekspor');
            return;
        }

        // Prepare data for Excel
        const excelData = wishes.map(wish => ({
            'No': wishes.indexOf(wish) + 1,
            'Nama': wish.name,
            'Pesan': wish.message,
            'Kehadiran': wish.attending === 'attending' ? 'Hadir' : 
                        wish.attending === 'not-attending' ? 'Tidak Hadir' : 'Mungkin',
            'Tanggal': formatEventDate(wish.timestamp)
        }));

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Set column widths
        ws['!cols'] = [
            { wch: 5 },   // No
            { wch: 20 },  // Nama
            { wch: 50 },  // Pesan
            { wch: 15 },  // Kehadiran
            { wch: 20 }   // Tanggal
        ];

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Data Ucapan');

        // Generate filename with current date
        const currentDate = new Date().toISOString().split('T')[0];
        const filename = `Data_Ucapan_${currentDate}.xlsx`;

        // Save file
        XLSX.writeFile(wb, filename);
    };
    return (<>
        <section id="wishes" className="min-h-screen relative overflow-hidden">
            {/* Gradient background and decorative blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-pink-50/40 to-rose-100/80" />
                <div className="absolute top-0 right-0 w-72 h-72 md:w-[26rem] md:h-[26rem] bg-rose-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-72 h-72 md:w-[26rem] md:h-[26rem] bg-pink-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
            
            {/* Background Butterflies */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Butterfly 1 */}
                <motion.div
                    className="absolute top-20 left-10 w-8 h-8"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="relative w-full h-full">
                        {/* Left wing */}
                        <div className="absolute -left-2 -top-2 w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full transform rotate-45"></div>
                        <div className="absolute -left-1 -top-1 w-2 h-2 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full transform rotate-45"></div>
                        
                        {/* Right wing */}
                        <div className="absolute -right-2 -top-2 w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full transform -rotate-45"></div>
                        <div className="absolute -right-1 -top-1 w-2 h-2 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full transform -rotate-45"></div>
                        
                        {/* Body */}
                        <div className="absolute left-1/2 top-1/2 w-1 h-3 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        
                        {/* Antennae */}
                        <div className="absolute left-1/2 top-0 w-0.5 h-1 bg-amber-800 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-amber-800 rounded-full transform -translate-x-1/2"></div>
                    </div>
                </motion.div>

                {/* Butterfly 2 */}
                <motion.div
                    className="absolute top-40 right-16 w-6 h-6"
                    animate={{
                        y: [0, -15, 0],
                        x: [0, -8, 0],
                        rotate: [0, -3, 3, 0]
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    <div className="relative w-full h-full">
                        {/* Left wing */}
                        <div className="absolute -left-1.5 -top-1.5 w-2.5 h-2.5 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full transform rotate-45"></div>
                        <div className="absolute -left-1 -top-1 w-1.5 h-1.5 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full transform rotate-45"></div>
                        
                        {/* Right wing */}
                        <div className="absolute -right-1.5 -top-1.5 w-2.5 h-2.5 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full transform -rotate-45"></div>
                        <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full transform -rotate-45"></div>
                        
                        {/* Body */}
                        <div className="absolute left-1/2 top-1/2 w-0.5 h-2 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        
                        {/* Antennae */}
                        <div className="absolute left-1/2 top-0 w-0.5 h-0.5 bg-slate-800 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-slate-800 rounded-full transform -translate-x-1/2"></div>
                    </div>
                </motion.div>

                {/* Butterfly 3 */}
                <motion.div
                    className="absolute bottom-32 left-20 w-7 h-7"
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 15, 0],
                        rotate: [0, 8, -8, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                >
                    <div className="relative w-full h-full">
                        {/* Left wing */}
                        <div className="absolute -left-2 -top-2 w-3.5 h-3.5 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full transform rotate-45"></div>
                        <div className="absolute -left-1.5 -top-1.5 w-2 h-2 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full transform rotate-45"></div>
                        
                        {/* Right wing */}
                        <div className="absolute -right-2 -top-2 w-3.5 h-3.5 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full transform -rotate-45"></div>
                        <div className="absolute -right-1.5 -top-1.5 w-2 h-2 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full transform -rotate-45"></div>
                        
                        {/* Body */}
                        <div className="absolute left-1/2 top-1/2 w-1 h-3.5 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        
                        {/* Antennae */}
                        <div className="absolute left-1/2 top-0 w-0.5 h-1 bg-emerald-800 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-emerald-800 rounded-full transform -translate-x-1/2"></div>
                    </div>
                </motion.div>

                {/* Butterfly 4 */}
                <motion.div
                    className="absolute top-60 left-1/3 w-5 h-5"
                    animate={{
                        y: [0, -18, 0],
                        x: [0, -12, 0],
                        rotate: [0, -6, 6, 0]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                >
                    <div className="relative w-full h-full">
                        {/* Left wing */}
                        <div className="absolute -left-1.5 -top-1.5 w-2.5 h-2.5 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full transform rotate-45"></div>
                        <div className="absolute -left-1 -top-1 w-1.5 h-1.5 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full transform rotate-45"></div>
                        
                        {/* Right wing */}
                        <div className="absolute -right-1.5 -top-1.5 w-2.5 h-2.5 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full transform -rotate-45"></div>
                        <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full transform -rotate-45"></div>
                        
                        {/* Body */}
                        <div className="absolute left-1/2 top-1/2 w-0.5 h-2.5 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        
                        {/* Antennae */}
                        <div className="absolute left-1/2 top-0 w-0.5 h-0.5 bg-amber-800 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-amber-800 rounded-full transform -translate-x-1/2"></div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle floral accents in the corners */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute -bottom-6 -left-2 text-rose-300/50">
                    <span className="text-5xl select-none">✿</span>
                </div>
                <div className="absolute top-8 -right-3 text-pink-300/50">
                    <span className="text-4xl select-none">✿</span>
                </div>
                <div className="absolute bottom-24 right-10 text-rose-200/50">
                    <span className="text-3xl select-none">✿</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-rose-500 font-medium"
                    >
                        Kirimkan Doa dan Harapan Terbaik Anda
                    </motion.span>

                    <motion.button
                                onClick={clearAllWishes}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-3 h-3 opacity-80 hover:opacity-100 transition-all duration-200"
                                title="Hapus Semua Data"
                            >
                                <div className="absolute inset-0">
                                    {/* Left wing */}
                                    <div className="absolute -left-1 -top-1 w-1.5 h-1.5 bg-orange-500 rounded-full transform rotate-45"></div>
                                    <div className="absolute -left-0.5 -top-0.5 w-1 h-1 bg-orange-300 rounded-full transform rotate-45"></div>
                                    {/* Right wing */}
                                    <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-orange-500 rounded-full transform -rotate-45"></div>
                                    <div className="absolute -right-0.5 -top-0.5 w-1 h-1 bg-orange-300 rounded-full transform -rotate-45"></div>
                                    {/* Body */}
                                    <div className="absolute left-1/2 top-1/2 w-0.5 h-2 bg-slate-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                    {/* Antennae */}
                                    <div className="absolute left-1/2 top-0 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                    <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                </div>
                            </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800">Pesan dan Doa</h2>

                        <div className="flex items-center gap-2">
                            {/* Small Orange Butterfly Clear All Button */}
                            {/* <motion.button
                                onClick={clearAllWishes}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-3 h-3 opacity-80 hover:opacity-100 transition-all duration-200"
                                title="Hapus Semua Data"
                            > */}
                                {/* <div className="absolute inset-0">
                                    <div className="absolute -left-1 -top-1 w-1.5 h-1.5 bg-orange-500 rounded-full transform rotate-45"></div>
                                    <div className="absolute -left-0.5 -top-0.5 w-1 h-1 bg-orange-300 rounded-full transform rotate-45"></div>
                                    <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-orange-500 rounded-full transform -rotate-45"></div>
                                    <div className="absolute -right-0.5 -top-0.5 w-1 h-1 bg-orange-300 rounded-full transform -rotate-45"></div>
                                    <div className="absolute left-1/2 top-1/2 w-0.5 h-2 bg-slate-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute left-1/2 top-0 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                    <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                </div>
                            </motion.button> */}

                            {/* Small Red Butterfly Clear Button */}
                            {/* <motion.button
                                onClick={clearDummyData}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-3 h-3 opacity-80 hover:opacity-100 transition-all duration-200"
                                title="Hapus Data Dummy"
                            > */}
                                {/* <div className="absolute inset-0">
                                    <div className="absolute -left-1 -top-1 w-1.5 h-1.5 bg-red-500 rounded-full transform rotate-45"></div>
                                    <div className="absolute -left-0.5 -top-0.5 w-1 h-1 bg-red-300 rounded-full transform rotate-45"></div>
                                    <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-red-500 rounded-full transform -rotate-45"></div>
                                    <div className="absolute -right-0.5 -top-0.5 w-1 h-1 bg-red-300 rounded-full transform -rotate-45"></div>
                                    <div className="absolute left-1/2 top-1/2 w-0.5 h-2 bg-slate-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute left-1/2 top-0 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                    <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                </div> */}
                            {/* </motion.button> */}

                            {/* Small Blue Butterfly Export Button */}
                            <motion.button
                                onClick={exportToExcel}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-3 h-3 opacity-80 hover:opacity-100 transition-all duration-200"
                                title="Export Excel"
                            >
                                <div className="absolute inset-0">
                                    {/* Left wing */}
                                    <div className="absolute -left-1 -top-1 w-1.5 h-1.5 bg-blue-500 rounded-full transform rotate-45"></div>
                                    <div className="absolute -left-0.5 -top-0.5 w-1 h-1 bg-blue-300 rounded-full transform rotate-45"></div>
                                    {/* Right wing */}
                                    <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-blue-500 rounded-full transform -rotate-45"></div>
                                    <div className="absolute -right-0.5 -top-0.5 w-1 h-1 bg-blue-300 rounded-full transform -rotate-45"></div>
                                    {/* Body */}
                                    <div className="absolute left-1/2 top-1/2 w-0.5 h-2 bg-slate-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                    {/* Antennae */}
                                    <div className="absolute left-1/2 top-0 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                    <div className="absolute left-1/2 top-0.5 w-0.5 h-0.5 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>

                    
                </motion.div>

                {/* Wishes List */}
                <div className="max-w-2xl mx-auto space-y-6">
                    <AnimatePresence>
                        <Marquee speed={20}
                            gradient={false}
                            className="[--duration:20s] py-2">
                            {wishes.map((wish, index) => (
                                <motion.div
                                    key={wish.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative w-[280px]"
                                >
                                    {/* Background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                                    {/* Card content */}
                                    <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                                        {/* Header */}
                                        <div className="flex items-start space-x-3 mb-2">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                                    {wish.name[0].toUpperCase()}
                                                </div>
                                            </div>

                                            {/* Name, Time, and Attendance */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-medium text-gray-800 text-sm truncate">
                                                        {wish.name}
                                                    </h4>
                                                    {getAttendanceIcon(wish.attending)}
                                                </div>
                                                <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                                    <Clock className="w-3 h-3" />
                                                    <time className="truncate">
                                                        {formatEventDate(wish.timestamp)}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3">
                                            {wish.message}
                                        </p>

                                        {/* Optional: Time indicator for recent messages */}
                                        {Date.now() - new Date(wish.timestamp).getTime() < 3600000 && (
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                                                    New
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </Marquee>
                    </AnimatePresence>
                </div>
                {/* Wishes Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mt-12"
                >
                    <form onSubmit={handleSubmitWish} className="relative">
                        <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                            <div className='space-y-2'>
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <User className="w-4 h-4" />
                                        <span>Nama Kamu</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        placeholder="Masukan nama kamu..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="space-y-2 relative"
                                >
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Apakah kamu hadir?</span>
                                    </div>

                                    {/* Custom Select Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                                    >
                                        <span className={attendance ? 'text-gray-700' : 'text-gray-400'}>
                                            {attendance ?
                                                options.find(opt => opt.value === attendance)?.label
                                                : 'Pilih kehadiran...'}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Options */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                                            >
                                                {options.map((option) => (
                                                    <motion.button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setAttendance(option.value);
                                                            setIsOpen(false);
                                                        }}
                                                        whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                                        className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${attendance === option.value
                                                                ? 'bg-rose-50 text-rose-600'
                                                                : 'text-gray-700 hover:bg-rose-50'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                {/* Wish Textarea */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Harapan kamu</span>
                                    </div>
                                    <textarea
                                        value={newWish}
                                        onChange={(e) => setNewWish(e.target.value)}
                                        placeholder="Kirimkan harapan dan doa untuk kedua mempelai..."
                                        className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <Smile className="w-5 h-5" />
                                    <span className="text-sm">Berikan Doa Anda</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${isSubmitting
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-rose-500 hover:bg-rose-600'}`}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Sedang Mengirim...' : 'Kirimkan Doa'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    </>)
}
