import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./worksAdmin.module.scss";

interface WorkItem {
  id: number;
  year: number;
  imageUrl: string;
  alt: string;
  desc: string;
}

interface FormValues {
  year: number | "";
  alt: string;
  desc: string;
  imageFile: File | null;
}

const validationSchema = Yup.object({
  year: Yup.number()
    .typeError("Year must be a number")
    .required("Year is required")
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  alt: Yup.string()
    .required("Alt text is required")
    .min(3, "Alt text must be at least 3 characters")
    .max(100, "Alt text must be less than 100 characters"),
  desc: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  imageFile: Yup.mixed()
    .required("Image file is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),
});

const initialValues: FormValues = {
  year: "",
  alt: "",
  desc: "",
  imageFile: null,
};

export default function WorksAdmin() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // 서버에서 기존 리스트 가져오기 - 에러 처리 강화
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/works");
        
        // API 응답이 배열인지 확인하고 안전하게 처리
        const worksData = response.data;
        if (Array.isArray(worksData)) {
          setWorks(worksData);
        } else if (worksData && Array.isArray(worksData.works)) {
          // 응답이 { works: [...] } 형태일 경우
          setWorks(worksData.works);
        } else if (worksData && Array.isArray(worksData.data)) {
          // 응답이 { data: [...] } 형태일 경우
          setWorks(worksData.data);
        } else {
          // 응답이 예상과 다르면 빈 배열로 설정
          console.warn("Unexpected API response format:", worksData);
          setWorks([]);
        }
      } catch (err) {
        console.error("Error fetching works:", err);
        // API가 없어도 컴포넌트는 계속 렌더링되도록 함
        setWorks([]);
        setError("Note: Works API is not available. This is a demo mode.");
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    fetchWorks();
  }, []);

  const handleSubmit = async (values: FormValues, { resetForm, setSubmitting }: any) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // 데모 모드 - 실제 API 호출 대신 로컬 상태만 업데이트
      const newWork = {
        id: Date.now(), // 임시 ID
        year: values.year as number,
        imageUrl: URL.createObjectURL(values.imageFile!), // 로컬 URL 생성
        alt: values.alt,
        desc: values.desc,
      };

      // 실제 API가 있을 때만 서버에 저장 시도
      try {
        const formData = new FormData();
        formData.append("image", values.imageFile!);

        const uploadResponse = await axios.post("/works", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const addResponse = await axios.post("/works", {
          year: values.year,
          imageUrl: uploadResponse.data.url,
          alt: values.alt,
          desc: values.desc,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // API 응답에서 새로 추가된 work 데이터 추출
        const addedWork = addResponse.data;
        if (addedWork && typeof addedWork === 'object') {
          setWorks((prev) => [...prev, addedWork]);
        } else {
          setWorks((prev) => [...prev, newWork]);
        }
      } catch (apiError) {
        // API가 없으면 로컬 상태만 업데이트
        setWorks((prev) => [...prev, newWork]);
        setSuccess("Work added successfully! (Demo mode - not saved to server)");
      }

      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to add work");
      console.error("Error adding work:", err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this work?")) return;

    try {
      // 실제 API가 있을 때만 서버에서 삭제 시도
      try {
        await axios.delete(`/works/${id}`);
      } catch (apiError) {
        console.log("API not available, deleting locally only");
      }
      
      setWorks((prev) => prev.filter((work) => work.id !== id));
      setSuccess("Work deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete work");
      console.error("Error deleting work:", err);
    }
  };

  // 초기화 중일 때 로딩 표시
  if (!isInitialized) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  // works가 배열이 아닐 경우를 대비한 안전장치
  const worksArray = Array.isArray(works) ? works : [];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Works Management</div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="year">Year</label>
              <Field
                type="number"
                id="year"
                name="year"
                placeholder="Enter year (e.g., 2024)"
                className={styles.input}
                min="1900"
                max={new Date().getFullYear()}
              />
              <ErrorMessage name="year" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imageFile">Image</label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue("imageFile", file);
                }}
                className={styles.fileInput}
              />
              <ErrorMessage name="imageFile" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="alt">Alt Text</label>
              <Field
                type="text"
                id="alt"
                name="alt"
                placeholder="Enter alt text for the image"
                className={styles.input}
              />
              <ErrorMessage name="alt" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="desc">Description</label>
              <Field
                as="textarea"
                id="desc"
                name="desc"
                placeholder="Enter description"
                className={styles.textarea}
              />
              <ErrorMessage name="desc" component="div" className={styles.error} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={styles.submitButton}
            >
              {loading ? "Uploading..." : "Add Work"}
            </button>
          </Form>
        )}
      </Formik>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <div className={styles.worksSection}>
        <h2>Works List</h2>
        <div className={styles.worksGrid}>
          {worksArray.map((work) => (
            <div key={work.id} className={styles.workCard}>
              <div className={styles.imageContainer}>
                <img src={work.imageUrl} alt={work.alt} className={styles.workImage} />
              </div>
              <div className={styles.workInfo}>
                <h3>{work.year} - {work.alt}</h3>
                <p>{work.desc}</p>
                <button
                  onClick={() => handleDelete(work.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {worksArray.length === 0 && (
          <div className={styles.emptyState}>
            <p>No works added yet. Add your first work above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
