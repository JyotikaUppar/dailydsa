import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { arrayData } from "@/data/arrayData";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { randomQuestion } from "@/data/randomData";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2 } from "lucide-react";

export default function Problems() {
  const router = useRouter();
  const { userData, updateUserProfile } = useAuth();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgba(31, 41, 55, 0.5)",
      color: "#fff",
      fontWeight: 600,
      fontSize: 15,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderBottom: "1px solid rgba(55, 65, 81, 0.5)",
      color: "#d1d5db",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(17, 24, 39, 0.5)",
    },
    "&:hover": {
      backgroundColor: "rgba(124, 58, 237, 0.1)",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="min-h-screen bg-[#0f1117] text-white selection:bg-primary/30">
      <Header />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>
      <div className="relative z-10 pt-32 pb-20" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="text-2xl font-bold font-sans text-violet-600 mb-7">
            Topic Based Questions
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer"
              onClick={() => router.push("/problems/array")}
            >
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Arrays
                  </h5>
                </div>
                <Link
                  href="/problems/array"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans text-violet-600">
                    Solve{" "}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer" onClick={() => router.push("/problems/backtracking")}>
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Backtracking
                  </h5>
                </div>
                <Link
                  href="/problems/backtracking"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer" onClick={() => router.push("/problems/dynamic-programming")}>
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Dynamic Programming
                  </h5>
                </div>
                <Link
                  href="/problems/dynamic-programming"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer" onClick={() => router.push("/problems/string")}>
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    String
                  </h5>
                </div>
                <Link
                  href="/problems/string"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer" onClick={() => router.push("/problems/hash-table")}>
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Hashing
                  </h5>
                </div>
                <Link
                  href="/problems/hash-table"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer" onClick={() => router.push("/problems/stack")}>
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Stacks & Queues
                  </h5>
                </div>
                <Link
                  href="/problems/stack"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer" onClick={() => router.push("/problems/tree")}>
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Trees
                  </h5>
                </div>
                <Link
                  href="/problems/tree"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer" onClick={() => router.push("/problems/graph")}>
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Graphs
                  </h5>
                </div>
                <Link
                  href="/problems/graph"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer">
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Greedy
                  </h5>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer">
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Linked List
                  </h5>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer">
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Two Pointers
                  </h5>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/20 cursor-pointer">
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Binary Search
                  </h5>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm font-sans">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold font-sans text-violet-600 mb-3 mt-12">
            All Topics
          </div>
          <TableContainer
            component={Paper}
            className="lg:w-8/12 lg:mx-auto mt-14 border border-gray-700/50 rounded-3xl overflow-hidden bg-gray-800/40 backdrop-blur-xl shadow-2xl flex justify-center item-center"
            sx={{ backgroundColor: "transparent", backgroundImage: "none", boxShadow: "none" }}
          >
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>LeetCode Id</StyledTableCell> */}
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Acceptance</StyledTableCell>
                  <StyledTableCell align="left">Difficulty</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {randomQuestion.questions.map((row, index) => (
                  <StyledTableRow key={index}>
                    {/* <StyledTableCell component="th" scope="row">
                      {row.questionId}
                    </StyledTableCell> */}
                    <StyledTableCell
                      align="left"
                      className="hover:text-violet-700 cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://leetcode.com/problems/${row.titleSlug}/`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="">{row.acRate}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.difficulty === "Easy" ? (
                        <div className="px-3 py-1 w-fit bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">
                          Easy
                        </div>
                      ) : row.difficulty === "Hard" ? (
                        <div className="px-3 py-1 w-fit bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-rose-500/20">
                          Hard
                        </div>
                      ) : (
                        <div className="px-3 py-1 w-fit bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-500/20">
                          Medium
                        </div>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-700 bg-gray-900/50 text-violet-600 focus:ring-violet-500"
                        checked={userData?.solvedProblems?.some(p => (typeof p === 'string' ? p : p.titleSlug) === row.titleSlug)}
                        onChange={async (e) => {
                          const isChecked = e.target.checked;
                          const currentSolved = userData?.solvedProblems || [];
                          let newSolved;
                          if (isChecked) {
                            const solveEntry = {
                              titleSlug: row.titleSlug,
                              title: row.title,
                              solvedAt: new Date().toISOString(),
                              difficulty: row.difficulty,
                              topic: row.topicTags?.[0]?.name || "General"
                            };
                            newSolved = [...currentSolved, solveEntry];
                          } else {
                            newSolved = currentSolved.filter(p => p.titleSlug !== row.titleSlug);
                          }
                          await updateUserProfile({ solvedProblems: newSolved });
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            className="lg:w-8/12 lg:mx-auto"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={arrayData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
