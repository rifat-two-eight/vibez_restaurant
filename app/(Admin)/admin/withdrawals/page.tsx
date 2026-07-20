"use client";

import React, { useState } from "react";
import {
    Wallet,
    Search,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Eye,
    Clock,
    DollarSign,
    User,
    CreditCard,
    AlertCircle,
    Building2,
    Send,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";
import {
    useGetAllWithdrawalsQuery,
    useGetWithdrawalStatsQuery,
    useApproveWithdrawalMutation,
    useRejectWithdrawalMutation,
} from "@/redux/features/dashboard/dashboardApi";
import { toast } from "sonner";

interface IWithdrawalItem {
    _id: string;
    userId?: {
        _id: string;
        name?: string;
        email?: string;
        role?: string;
        profileImage?: string;
        image?: string;
        balance?: number;
    };
    amount: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    paymentMethod: "STRIPE" | "BANK";
    paymentDetails?: Record<string, any>;
    adminFeedback?: string;
    stripeTransferId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function AdminWithdrawalsPage() {
    const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit] = useState<number>(10);

    // Modal States
    const [detailModalItem, setDetailModalItem] = useState<IWithdrawalItem | null>(null);
    const [rejectModalItem, setRejectModalItem] = useState<IWithdrawalItem | null>(null);
    const [rejectFeedback, setRejectFeedback] = useState<string>("");
    const [processingId, setProcessingId] = useState<string | null>(null);

    // Query Stats & Withdrawals from Backend
    const { data: statsResponse, refetch: refetchStats } = useGetWithdrawalStatsQuery();
    const queryStatus = selectedStatus === "ALL" ? undefined : selectedStatus;
    const { data: responseData, isLoading, isFetching, refetch } = useGetAllWithdrawalsQuery({
        status: queryStatus,
        page: currentPage,
        limit,
    });

    const [approveWithdrawal] = useApproveWithdrawalMutation();
    const [rejectWithdrawal] = useRejectWithdrawalMutation();

    const rawWithdrawals: IWithdrawalItem[] = responseData?.data || [];
    const meta = responseData?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
    const stats = statsResponse?.data;

    // Use Backend Stats data
    const totalCount = stats?.totalCount ?? meta.total ?? rawWithdrawals.length;
    const overallTotalAmount = stats?.totalAmount ?? rawWithdrawals.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const pendingCount = stats?.pendingCount ?? rawWithdrawals.filter((w) => w.status === "PENDING").length;
    const pendingTotalAmount = stats?.pendingAmount ?? rawWithdrawals.filter((w) => w.status === "PENDING").reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const approvedCount = stats?.approvedCount ?? rawWithdrawals.filter((w) => w.status === "APPROVED").length;
    const approvedTotalAmount = stats?.approvedAmount ?? rawWithdrawals.filter((w) => w.status === "APPROVED").reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const rejectedCount = stats?.rejectedCount ?? rawWithdrawals.filter((w) => w.status === "REJECTED").length;
    const rejectedTotalAmount = stats?.rejectedAmount ?? rawWithdrawals.filter((w) => w.status === "REJECTED").reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // Client-side search filtering (by user name, email, or withdrawal ID)
    const filteredWithdrawals = rawWithdrawals.filter((item) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();
        const userName = item.userId?.name?.toLowerCase() || "";
        const userEmail = item.userId?.email?.toLowerCase() || "";
        const id = item._id.toLowerCase();
        const method = item.paymentMethod.toLowerCase();
        return userName.includes(term) || userEmail.includes(term) || id.includes(term) || method.includes(term);
    });

    // Handle Approve Payout
    const handleApprove = async (id: string) => {
        setProcessingId(id);
        try {
            await approveWithdrawal(id).unwrap();
            toast.success("Withdrawal approved and processed successfully!");
        } catch (error: any) {
            console.error("Approve withdrawal error:", error);
            const msg = error?.data?.message || "Failed to approve withdrawal";
            toast.error(msg);
        } finally {
            setProcessingId(null);
        }
    };

    // Handle Reject Payout Submit
    const handleRejectSubmit = async () => {
        if (!rejectModalItem) return;
        setProcessingId(rejectModalItem._id);
        try {
            await rejectWithdrawal({
                id: rejectModalItem._id,
                adminFeedback: rejectFeedback.trim() || undefined,
            }).unwrap();
            toast.success("Withdrawal request rejected and balance refunded to user.");
            setRejectModalItem(null);
            setRejectFeedback("");
        } catch (error: any) {
            console.error("Reject withdrawal error:", error);
            const msg = error?.data?.message || "Failed to reject withdrawal";
            toast.error(msg);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-8 pb-16">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1.5">
                        <div className="w-10 h-10 rounded-xl bg-[#1447E6]/10 border border-[#1447E6]/30 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-[#1447E6]" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Withdrawal Requests
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Review, process, and manage user payout requests securely.
                    </p>
                </div>

                <button
                    onClick={() => {
                        refetch();
                        refetchStats();
                    }}
                    disabled={isFetching}
                    className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171717] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin text-[#1447E6]" : ""}`} />
                    <span>Refresh Data</span>
                </button>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Requests Card */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                            Total Requests
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300">
                            <Wallet className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                        {totalCount}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                        Sum: <span className="text-zinc-300 font-semibold">CHF {overallTotalAmount.toFixed(2)}</span>
                    </p>
                </div>

                {/* Pending Payouts Card */}
                <div className="bg-[#171717] border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                            Pending Payouts
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                            <Clock className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                        CHF {pendingTotalAmount.toFixed(2)}
                    </h3>
                    <p className="text-xs text-amber-400/80 font-medium">
                        {pendingCount} request{pendingCount !== 1 ? "s" : ""} awaiting action
                    </p>
                </div>

                {/* Approved Payouts Card */}
                <div className="bg-[#171717] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                            Approved Payouts
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <CheckCircle2 className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                        CHF {approvedTotalAmount.toFixed(2)}
                    </h3>
                    <p className="text-xs text-emerald-400/80 font-medium">
                        {approvedCount} payout{approvedCount !== 1 ? "s" : ""} completed
                    </p>
                </div>

                {/* Rejected Payouts Card */}
                <div className="bg-[#171717] border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-rose-500/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                            Rejected Payouts
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                            <XCircle className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                        CHF {rejectedTotalAmount.toFixed(2)}
                    </h3>
                    <p className="text-xs text-rose-400/80 font-medium">
                        {rejectedCount} request{rejectedCount !== 1 ? "s" : ""} refunded
                    </p>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5 self-start md:self-auto overflow-x-auto max-w-full">
                    {[
                        { key: "ALL", label: "All Statuses" },
                        { key: "PENDING", label: "Pending" },
                        { key: "APPROVED", label: "Approved" },
                        { key: "REJECTED", label: "Rejected" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => {
                                setSelectedStatus(tab.key);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                                selectedStatus === tab.key
                                    ? "bg-[#1447E6] text-white shadow-md shadow-[#1447E6]/25"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by user, email or ID..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-500 text-xs focus:outline-none focus:border-[#1447E6] transition-all"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Withdrawals Table Container */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                {isLoading ? (
                    <div className="p-16 text-center">
                        <RefreshCw className="w-8 h-8 text-[#1447E6] animate-spin mx-auto mb-3" />
                        <p className="text-zinc-400 text-sm font-medium">Fetching withdrawal requests...</p>
                    </div>
                ) : filteredWithdrawals.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 mx-auto mb-4 border border-white/5">
                            <Wallet className="w-7 h-7" />
                        </div>
                        <h4 className="text-white font-bold text-base mb-1">No Withdrawal Requests Found</h4>
                        <p className="text-zinc-500 text-xs max-w-sm mx-auto">
                            {searchTerm
                                ? `No withdrawal matching "${searchTerm}". Try clearing your search.`
                                : selectedStatus !== "ALL"
                                ? `There are currently no withdrawal requests marked as ${selectedStatus.toLowerCase()}.`
                                : "No withdrawal requests exist in the system yet."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/30 border-b border-white/5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">Amount Requested</th>
                                    <th className="px-6 py-4">Payment Method</th>
                                    <th className="px-6 py-4">Current Balance</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredWithdrawals.map((item) => {
                                    const user = item.userId;
                                    const avatar = user?.profileImage || user?.image;
                                    const isPending = item.status === "PENDING";
                                    const isApproved = item.status === "APPROVED";
                                    const isRejected = item.status === "REJECTED";
                                    const isProcessingThis = processingId === item._id;

                                    return (
                                        <tr
                                            key={item._id}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            {/* User Info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                                                        {avatar ? (
                                                            <img
                                                                src={avatar}
                                                                alt={user?.name || "User Avatar"}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <User className="w-5 h-5 text-zinc-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white group-hover:text-[#1447E6] transition-colors">
                                                            {user?.name || "Unknown User"}
                                                        </p>
                                                        <p className="text-xs text-zinc-400">
                                                            {user?.email || "No email available"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Requested Amount */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-white tracking-tight">
                                                    CHF {item.amount?.toFixed(2)}
                                                </span>
                                            </td>

                                            {/* Payment Method */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                                        item.paymentMethod === "STRIPE"
                                                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                    }`}
                                                >
                                                    {item.paymentMethod === "STRIPE" ? (
                                                        <CreditCard className="w-3 h-3" />
                                                    ) : (
                                                        <Building2 className="w-3 h-3" />
                                                    )}
                                                    {item.paymentMethod}
                                                </span>
                                            </td>

                                            {/* User Current Balance */}
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-semibold text-zinc-300">
                                                    CHF {user?.balance !== undefined ? user.balance.toFixed(2) : "0.00"}
                                                </span>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        isPending
                                                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                            : isApproved
                                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-1.5 h-1.5 rounded-full ${
                                                            isPending
                                                                ? "bg-amber-400 animate-pulse"
                                                                : isApproved
                                                                ? "bg-emerald-400"
                                                                : "bg-rose-400"
                                                        }`}
                                                    />
                                                    {item.status}
                                                </span>
                                            </td>

                                            {/* Created Date */}
                                            <td className="px-6 py-4 text-xs text-zinc-400 font-medium">
                                                {item.createdAt
                                                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                                                          month: "short",
                                                          day: "numeric",
                                                          year: "numeric",
                                                      })
                                                    : "N/A"}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* View Detail Button */}
                                                    <button
                                                        onClick={() => setDetailModalItem(item)}
                                                        title="View Details"
                                                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>

                                                    {/* Approve Button */}
                                                    {isPending && (
                                                        <button
                                                            onClick={() => handleApprove(item._id)}
                                                            disabled={isProcessingThis}
                                                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-1.5"
                                                        >
                                                            {isProcessingThis ? (
                                                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                            ) : (
                                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                            )}
                                                            <span>Approve</span>
                                                        </button>
                                                    )}

                                                    {/* Reject Button */}
                                                    {isPending && (
                                                        <button
                                                            onClick={() => {
                                                                setRejectModalItem(item);
                                                                setRejectFeedback("");
                                                            }}
                                                            disabled={isProcessingThis}
                                                            className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-600/30 font-bold text-xs transition-all disabled:opacity-50 flex items-center gap-1.5"
                                                        >
                                                            <XCircle className="w-3.5 h-3.5" />
                                                            <span>Reject</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Footer */}
                {meta.totalPages > 1 && (
                    <div className="p-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 bg-black/20">
                        <div className="flex items-center gap-3">
                            <span>
                                Showing Page <strong className="text-white">{meta.page}</strong> of{" "}
                                <strong className="text-white">{meta.totalPages}</strong> ({meta.total} total requests)
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={!meta.hasPrev || isFetching}
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 font-semibold"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                Previous
                            </button>

                            {/* Page Number Buttons */}
                            <div className="hidden md:flex items-center gap-1">
                                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                                    .filter((p) => p === 1 || p === meta.totalPages || Math.abs(p - meta.page) <= 1)
                                    .map((pageNum, idx, arr) => {
                                        const prevPage = arr[idx - 1];
                                        const showEllipsis = prevPage && pageNum - prevPage > 1;

                                        return (
                                            <React.Fragment key={pageNum}>
                                                {showEllipsis && <span className="px-1 text-zinc-600">...</span>}
                                                <button
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                                                        currentPage === pageNum
                                                            ? "bg-[#1447E6] text-white shadow-sm shadow-[#1447E6]/30"
                                                            : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            </React.Fragment>
                                        );
                                    })}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, meta.totalPages))}
                                disabled={!meta.hasNext || isFetching}
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 font-semibold"
                            >
                                Next
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* DETAILS MODAL */}
            {detailModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#1447E6]/10 border border-[#1447E6]/30 flex items-center justify-center text-[#1447E6]">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">Withdrawal Details</h3>
                                    <p className="text-xs text-zinc-400">ID: {detailModalItem._id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setDetailModalItem(null)}
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            {/* User Summary Card */}
                            <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden flex items-center justify-center shrink-0 border border-white/10">
                                        {detailModalItem.userId?.profileImage || detailModalItem.userId?.image ? (
                                            <img
                                                src={detailModalItem.userId?.profileImage || detailModalItem.userId?.image}
                                                alt="User Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-6 h-6 text-zinc-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">
                                            {detailModalItem.userId?.name || "Unknown User"}
                                        </h4>
                                        <p className="text-xs text-zinc-400">{detailModalItem.userId?.email}</p>
                                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold bg-white/10 text-zinc-300 uppercase">
                                            Role: {detailModalItem.userId?.role || "USER"}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] text-zinc-400 font-semibold uppercase">Current Balance</p>
                                    <p className="text-sm font-bold text-emerald-400">
                                        CHF {detailModalItem.userId?.balance !== undefined ? detailModalItem.userId.balance.toFixed(2) : "0.00"}
                                    </p>
                                </div>
                            </div>

                            {/* Payout Data Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                                    <p className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Requested Amount</p>
                                    <p className="text-lg font-bold text-white">CHF {detailModalItem.amount?.toFixed(2)}</p>
                                </div>

                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                                    <p className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Payment Method</p>
                                    <p className="text-sm font-bold text-purple-400 uppercase flex items-center gap-1.5 mt-1">
                                        <CreditCard className="w-4 h-4" />
                                        {detailModalItem.paymentMethod}
                                    </p>
                                </div>

                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                                    <p className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Status</p>
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase mt-1 ${
                                            detailModalItem.status === "PENDING"
                                                ? "bg-amber-500/10 text-amber-400"
                                                : detailModalItem.status === "APPROVED"
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-rose-500/10 text-rose-400"
                                        }`}
                                    >
                                        {detailModalItem.status}
                                    </span>
                                </div>

                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                                    <p className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Date Requested</p>
                                    <p className="text-xs font-semibold text-zinc-300 mt-1">
                                        {detailModalItem.createdAt
                                            ? new Date(detailModalItem.createdAt).toLocaleString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Additional Payment Details */}
                            {detailModalItem.paymentDetails && Object.keys(detailModalItem.paymentDetails).length > 0 && (
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2">
                                    <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                        Provided Payment Details
                                    </p>
                                    <pre className="text-xs text-zinc-400 bg-black/40 p-3 rounded-lg overflow-x-auto font-mono">
                                        {JSON.stringify(detailModalItem.paymentDetails, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {/* Stripe Transfer ID */}
                            {detailModalItem.stripeTransferId && (
                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                                    <p className="text-xs font-bold text-emerald-400 mb-1">Stripe Transfer Transaction ID</p>
                                    <p className="text-xs font-mono text-white select-all">{detailModalItem.stripeTransferId}</p>
                                </div>
                            )}

                            {/* Rejection Feedback */}
                            {detailModalItem.adminFeedback && (
                                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                                    <p className="text-xs font-bold text-rose-400 mb-1">Admin Rejection Feedback</p>
                                    <p className="text-xs text-zinc-300">{detailModalItem.adminFeedback}</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-white/10 bg-black/30 flex justify-end">
                            <button
                                onClick={() => setDetailModalItem(null)}
                                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* REJECTION MODAL */}
            {rejectModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#171717] border border-rose-500/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-rose-500/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">Reject Payout Request</h3>
                                    <p className="text-xs text-zinc-400">
                                        Refund CHF {rejectModalItem.amount?.toFixed(2)} to {rejectModalItem.userId?.name || "user"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setRejectModalItem(null)}
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4">
                            <p className="text-xs text-zinc-300 leading-relaxed">
                                Rejecting this withdrawal will restore the requested amount (<strong>CHF {rejectModalItem.amount?.toFixed(2)}</strong>) back into the user’s account balance.
                            </p>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                    Rejection Reason / Admin Feedback (Optional)
                                </label>
                                <textarea
                                    value={rejectFeedback}
                                    onChange={(e) => setRejectFeedback(e.target.value)}
                                    placeholder="Explain why this request is being rejected (e.g., Incomplete bank account info, Failed verification checks)..."
                                    rows={3}
                                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-rose-500 transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setRejectModalItem(null)}
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-semibold text-xs transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRejectSubmit}
                                disabled={processingId === rejectModalItem._id}
                                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-md shadow-rose-600/20 disabled:opacity-50 flex items-center gap-1.5"
                            >
                                {processingId === rejectModalItem._id ? (
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <Send className="w-3.5 h-3.5" />
                                )}
                                <span>Confirm Rejection</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
